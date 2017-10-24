import com.pwrd.UserService;
import org.apache.thrift.protocol.TBinaryProtocol;
import org.apache.thrift.server.TServer;
import org.apache.thrift.server.TThreadPoolServer;
import org.apache.thrift.server.TThreadPoolServer.Args;
import org.apache.thrift.transport.TServerSocket;
import org.apache.thrift.transport.TTransportException;

public class UserServer {

	private int iPort = 8989;

	private void startServer() {
		try {
			TServerSocket serverTransport = new TServerSocket(iPort);
			UserService.Processor process = new UserService.Processor(new UserServiceImpl());
			TBinaryProtocol.Factory portFactory = new TBinaryProtocol.Factory(true, true);
			Args args = new Args(serverTransport);
			args.processor(process);
			args.protocolFactory(portFactory);
			TServer server = new TThreadPoolServer(args);
			server.serve();
		} catch (TTransportException e) {
			e.printStackTrace();
		}
	}

	public static void main(String[] args) {
		UserServer svrObj = new UserServer();
		System.out.println("UserServer is running on " + svrObj.iPort + " ...");
		svrObj.startServer();
	}

}
