import io.netty.channel.Channel;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import net.sf.json.JSONObject;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;


public class ClientHandler extends SimpleChannelInboundHandler<String> {
	// key is sequence ID, value is response message
	private Map<Integer,String> response = new ConcurrentHashMap<Integer, String>();
	// key is sequence ID, value is request thread
	private final Map<Integer,Thread> waiters = new ConcurrentHashMap<Integer, Thread>();
	private final AtomicInteger sequence = new AtomicInteger();

	@Override
	public void channelActive(ChannelHandlerContext ctx) throws Exception {
		// when channel is ready
		System.out.println("\nClient channel is ready!");
		// block until having sent
		// ctx.writeAndFlush("started");
	}

	@Override
	public void channelRead0(ChannelHandlerContext ctx, String message) throws Exception {
		JSONObject json = JSONObject.fromObject(message);
		Integer id = json.getInt("id");
		response.put(id,json.getString("md5Hex"));
		// after getting response, remove from waiters and wakeup the thread
		Thread thread = waiters.remove(id);
		synchronized(thread) {
			thread.notifyAll();
		}
	}

	String call(String message, Channel channel) throws Exception {
		// create one ID and bind with the request
		int id = sequence.incrementAndGet();
		Thread current = Thread.currentThread();
		waiters.put(id,current);
		JSONObject json = new JSONObject();
		json.put("id",id);
		json.put("source",message);
		channel.writeAndFlush(json.toString());
		while (!response.containsKey(id)) {
			synchronized (current) {
				// block the thread of caller until received response
				current.wait();
			}
		}
		waiters.remove(id);
		return response.remove(id);
	}

}

