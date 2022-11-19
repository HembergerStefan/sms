package thread;

import lombok.AllArgsConstructor;
import websockets.ClientSocket;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
@AllArgsConstructor
public class ClientResponseThread extends Thread {
    private ClientSocket clientSocket;

    public void run() {
        while (true) {
            try {
                Thread.sleep(5000);
                if (clientSocket.isAllowedToRun()) {
                    if (clientSocket != null) {
                        clientSocket.sendMessage();
                    }
                }
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
        }
    }
}
