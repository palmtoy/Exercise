import java.io.IOException;
import java.io.OutputStream;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.nio.charset.Charset;
import java.util.Date;

public class PlainOioServer {

	private void server(int port) throws IOException {
		InetAddress inetAddress = InetAddress.getLocalHost();
		System.out.println(inetAddress);
		final ServerSocket socket = new ServerSocket(port, 0, inetAddress);
		try {
			for (;;) {
				final Socket clientSocket = socket.accept();
				System.out.println("Accepted connection from " + clientSocket);

				new Thread(new Runnable() {
					@Override
					public void run() {
						OutputStream out;
						try {
							out = clientSocket.getOutputStream();
							out.write(("\n" + new Date() + " ~ Hi!\n\n").getBytes(Charset.forName("UTF-8")));
							out.flush();
							clientSocket.close();

						} catch (IOException e) {
							e.printStackTrace();
							try {
								clientSocket.close();
							} catch (IOException ex) {
								// ignore on close
							}
						}
					}
				}).start();
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public static void main(String[] args) throws IOException {
		int port = 9999;
		System.out.println(PlainOioServer.class.getName() + " started and listen on port " + port + " ...");
		new PlainOioServer().server(port);
	}

}

