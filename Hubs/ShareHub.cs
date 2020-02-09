using Microsoft.AspNetCore.SignalR;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;

namespace live_share_editor.Hubs
{
    public class ShareHub : Hub
    {
        private readonly ILogger _logger;
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

        public ShareHub(ILogger<ShareHub> logger)
        {
            _logger = logger;
        }
        public async Task JoinGroup(JoinGroupRequest req)
        {
            string sessionId = req.sessionId;
            if (string.IsNullOrEmpty(sessionId))
            {
                sessionId = this.GenerateSessionID();
                _logger.LogInformation($"GenerateSessionID: SessionID={sessionId}");
            }
            if (req.isEditor)
            {
                if (EditorAlreadyExistsList.Contains(sessionId))
                {
                    _logger.LogInformation($"EditorIsAlreadyExists: SessionID={sessionId}");
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
            _logger.LogInformation($"UserJoinGroup: ConnectionId={Context.ConnectionId} SessionID={sessionId} Role={(req.isEditor ? "Editor" : "Viewer")}");
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
            _logger.LogInformation($"LeaveGroup: SessionID={sessionId}");
            EditorAlreadyExistsList.Remove(sessionId);
        }
        public async Task SendMessage(string sessionId, string message)
        {
            await Clients.Group(sessionId).SendAsync("ReceiveMessage", message);
        }
    }
}