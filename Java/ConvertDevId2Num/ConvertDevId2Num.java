//  $ ./gen.sh UpdateMessageDigestInputStream DigestUtils ConvertDevId2Num ConvertDevIdToNum

import java.nio.charset.StandardCharsets;

public class ConvertDevId2Num {
	public static void main(String[] args) {
		if (args.length == 1) {
			String deviceId = args[0];
			String strMD5 = DigestUtils.md5DigestAsHex(deviceId.getBytes(StandardCharsets.UTF_8)).substring(0, 15).toUpperCase();
			long rdmNum = Math.abs(Long.parseLong(strMD5, 16)) % 10;
			System.out.println(rdmNum);
		} else {
			System.out.println("Please input deviceId...");
		}
	}
}
