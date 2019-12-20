/**
 * 定义了一个具体的类，是被装饰类，也可以给这个类添加一些职责
 */

public class ConcreteComponent implements Component{

	@Override
	public void Operation() {
		System.out.println("This is ConcreteComponent.");
	}

}
