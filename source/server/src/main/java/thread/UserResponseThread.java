//Christian Freilinger
package thread;

import lombok.AllArgsConstructor;
import websockets.WebSocket;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
@AllArgsConstructor
public class UserResponseThread extends Thread{
    private WebSocket webpageSocket;
    public void run() {
        while (true) {
            try {
                Thread.sleep(5000);
                if (webpageSocket.isAllowedToRun()) {
                    if (webpageSocket != null) {
                        webpageSocket.sendMessage();
                    }
                }
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
        }
    }
}
