using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace live_share_editor.Hubs
{
    public class ShareHub : Hub
    {
        public async Task SendMessage(string message)
        {
            await Clients.Others.SendAsync("ReceiveMessage", message);
        }
    }
}