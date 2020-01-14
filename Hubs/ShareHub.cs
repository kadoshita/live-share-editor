using Microsoft.AspNetCore.SignalR;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace live_share_editor.Hubs
{
    public class ShareHub : Hub
    {
        private static string ALPHANUMERIC = "abcdefghijklmnopqrstuvwxyz0123456789";
        private static Random random = new Random();
        private static List<string> EditorAlreadyExistsList = new List<string>();
        public class JoinGroupRequest
        {
            public string sessionId { get; set; }
            public bool isEditor { get; set; }
        }
        private string GenerateSessionID()
        {
            return new string(Enumerable.Repeat(ALPHANUMERIC, 8).Select(s => s[random.Next(s.Length)]).ToArray());
        }
        public async Task JoinGroup(JoinGroupRequest req)
        {
            string sessionId = req.sessionId;
            if (string.IsNullOrEmpty(sessionId))
            {
                sessionId = this.GenerateSessionID();
            }
            if (req.isEditor)
            {
                if (EditorAlreadyExistsList.Contains(sessionId))
                {
                    Console.WriteLine($"{sessionId} Editor is already exists");
                    await Clients.Caller.SendAsync("Joined", new
                    {
                        Succeeded = false,
                        SessionId = "",
                        Message = "Editorがすでに存在します"
                    });
                    return;
                }
                else
                {
                    EditorAlreadyExistsList.Add(sessionId);
                }
            }
            await Groups.AddToGroupAsync(Context.ConnectionId, sessionId);
            Console.WriteLine($"{Context.ConnectionId} joined {sessionId} as {(req.isEditor ? "Editor" : "Viewer")}");
            await Clients.Caller.SendAsync("Joined", new
            {
                Succeeded = true,
                SessionId = sessionId,
                Message = ""
            });
            if (!req.isEditor)
            {
                await Clients.Group(sessionId).SendAsync("JoinNotify");
            }
        }
        public void LeaveGroup(string sessionId)
        {
            Console.WriteLine($"{sessionId} Editor leave");
            EditorAlreadyExistsList.Remove(sessionId);
        }
        public async Task SendMessage(string sessionId, string message)
        {
            await Clients.Group(sessionId).SendAsync("ReceiveMessage", message);
        }
    }
}