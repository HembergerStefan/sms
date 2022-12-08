//Christian Freilinger
package thread;

import lombok.AllArgsConstructor;
import websockets.ClientSocket;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
@AllArgsConstructor
public class ClientResponseThread extends Thread {
    private ClientSocket clientSocket;

    public void run() {
        while (true) {//läuft dauerhaft, nach dem Starten
            try {
                Thread.sleep(5000);//wartet 5 Sekunden
                if (clientSocket.isAllowedToRun()) {//wird nur ausgeführt, wenn es Clients mit Sessions gibt
                    if (clientSocket != null) {
                        clientSocket.sendMessage();//schickt Nachrichten
                    }
                }
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
        }
    }
}
