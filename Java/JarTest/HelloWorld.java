import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class HelloWorld {
	public static void main(String[] args) throws ParseException {
		Calendar now = Calendar.getInstance();
		Date ms = now.getTime();
		System.out.println("Hello World! ~ Palmtoy - " + ms);

		System.out.println("Year: " + now.get(Calendar.YEAR));
		System.out.println("Month: " + (now.get(Calendar.MONTH) + 1) + "");
		System.out.println("Day: " + now.get(Calendar.DAY_OF_MONTH));
		System.out.println("Hour: " + now.get(Calendar.HOUR_OF_DAY));
		System.out.println("Minute: " + now.get(Calendar.MINUTE));
		System.out.println("Second: " + now.get(Calendar.SECOND));
		System.out.println("Current ms: " + now.getTimeInMillis());
		System.out.println(now.getTime());

		Date d = new Date();
		System.out.println(d);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String dateNowStr = sdf.format(d);
		System.out.println("Date after format: " + dateNowStr);

		// it should be the same format with sdf
		String str = "2017-03-15 17:26:33";
		Date today = sdf.parse(str);
		System.out.println("Convert to date: " + today);
	}
}

