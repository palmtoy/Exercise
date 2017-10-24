import com.pwrd.User;
import com.pwrd.UserService;

public class UserServiceImpl implements UserService.Iface {
	@Override
	public User getById(long id) {
		System.out.println("getById is running ~ id = " + id);
		User userObj = new User();
		userObj.setId(id);
		return userObj;
	}

	@Override
	public User getByAll(long id, String name, long timestamp, boolean vip) {
		System.out.println("getByAll is running ~ id, name, timestamp, vip = "
			                   + id + ", " + name + ", " + timestamp + ", " + vip);
		return new User(id, name, timestamp, vip);
	}
}

