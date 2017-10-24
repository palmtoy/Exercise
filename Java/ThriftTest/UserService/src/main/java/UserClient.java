import com.pwrd.User;
import com.pwrd.UserService;
import org.apache.thrift.TException;
import org.apache.thrift.protocol.TBinaryProtocol;
import org.apache.thrift.protocol.TProtocol;
import org.apache.thrift.transport.TSocket;
import org.apache.thrift.transport.TTransport;
import org.apache.thrift.transport.TTransportException;


public class UserClient {

	private void startClient() {
		TTransport transport;
		try {
			int iPort = 8989;
			transport = new TSocket("localhost", iPort);
			TProtocol protocol = new TBinaryProtocol(transport);
			UserService.Client client = new UserService.Client(protocol);
			transport.open();
			User user = client.getById(1001);
			System.out.println(user.toString());
			transport.close();
		} catch (TTransportException e) {
			e.printStackTrace();
		} catch (TException e) {
			e.printStackTrace();
		}
	}

	public static void main(String[] args) {
		UserClient usCli = new UserClient();
		usCli.startClient();
	}

}
