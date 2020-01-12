using Microsoft.AspNetCore.SignalR;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace live_share_editor.Hubs
{
    public class ShareHub : Hub
    {
        private static string ALPHANUMERIC = "abcdefghijklmnopqrstuvwxyz0123456789";
        private static Random random = new Random();
        private string GenerateSessionID()
        {
            return new string(Enumerable.Repeat(ALPHANUMERIC, 8).Select(s => s[random.Next(s.Length)]).ToArray());
        }
        public async Task JoinGroup(string sessionId)
        {
            if (string.IsNullOrEmpty(sessionId))
            {
                sessionId = this.GenerateSessionID();
            }
            Console.WriteLine($"{Context.ConnectionId} joined {sessionId}");
            await Groups.AddToGroupAsync(Context.ConnectionId, sessionId);
            await Clients.Caller.SendAsync("Joined", sessionId);
            await Clients.Group(sessionId).SendAsync("JoinNotify");
        }
        public async Task SendMessage(string sessionId, string message)
        {
            await Clients.Group(sessionId).SendAsync("ReceiveMessage", message);
        }
    }
}