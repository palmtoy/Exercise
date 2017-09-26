import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import java.nio.charset.Charset;

public class ByteBufTest {
	static void printFuncName() {
		System.out.println(Thread.currentThread().getStackTrace()[2].getMethodName() + " is running ...");
	}

	static void foo() {
		printFuncName();
		Charset utf8 = Charset.forName("UTF-8");
		ByteBuf buf = Unpooled.copiedBuffer("Netty in Action rocks!", utf8);
		System.out.println("(1) buf = " + buf.toString(utf8));

		ByteBuf sliced = buf.slice(0, 12);
		System.out.println("(1) sliced = " + sliced.toString(utf8));

		buf.setByte(0, (byte)'J');
		System.out.println("(2) buf = " + buf.toString(utf8));
		System.out.println("(2) sliced = " + sliced.toString(utf8));
		assert buf.getByte(0) == sliced.getByte(0);
		System.out.println((char)buf.getByte(0));
		System.out.println((char)sliced.getByte(0));
		System.out.println();
	}


	static void bar() {
		printFuncName();
		Charset utf8 = Charset.forName("UTF-8");
		ByteBuf buf = Unpooled.copiedBuffer("Netty in Action rocks!", utf8);
		System.out.println("(A) buf = " + buf.toString(utf8));

		ByteBuf copy = buf.copy(0, 12);
		System.out.println("(A) copy = " + copy.toString(utf8));

		buf.setByte(0, (byte) 'J');
		System.out.println("(B) buf = " + buf.toString(utf8));
		System.out.println("(B) copy = " + copy.toString(utf8));
		assert buf.getByte(0) != copy.getByte(0);
		System.out.println((char)buf.getByte(0));
		System.out.println((char)copy.getByte(0));
		System.out.println();
	}

	static void hello() {
		printFuncName();
		Charset utf8 = Charset.forName("UTF-8");
		ByteBuf buf = Unpooled.copiedBuffer("Netty in Action rocks!", utf8);
		System.out.println((char)buf.getByte(0));

		int readerIndex = buf.readerIndex();
		int writerIndex = buf.writerIndex();

		buf.setByte(0, (byte)'B');

		System.out.println((char)buf.getByte(0));
		System.out.println("buf = " + buf.toString(utf8));
		assert readerIndex == buf.readerIndex();
		assert writerIndex ==  buf.writerIndex();
		System.out.println("readerIndex = " + readerIndex);
		System.out.println("writerIndex = " + writerIndex);
		System.out.println();
	}

	static void world() {
		printFuncName();
		Charset utf8 = Charset.forName("UTF-8");
		ByteBuf buf = Unpooled.copiedBuffer("Netty in Action rocks!", utf8);
		System.out.println((char)buf.readByte());
		System.out.println("buf = " + buf.toString(utf8));

		int readerIndex = buf.readerIndex();
		int writerIndex = buf.writerIndex();

		buf.writeByte((byte)'?');
		System.out.println("buf = " + buf.toString(utf8));

		assert readerIndex == buf.readerIndex();
		assert writerIndex != buf.writerIndex();
		System.out.println("readerIndex = " + readerIndex);
		System.out.println("writerIndex = " + writerIndex);
		System.out.println("buf.writerIndex = " + buf.writerIndex());
		System.out.println();
	}

	public static void main(String args[]) {
		System.out.println(new Object(){}.getClass().getEnclosingMethod().getName() + " is running ...\n");
		foo();
		bar();
		hello();
		world();
	}
}

