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
}

