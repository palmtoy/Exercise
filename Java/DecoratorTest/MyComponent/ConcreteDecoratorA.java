/**
 * 具体的装饰产品类，起到给Component添加职责的功能
 */

public class ConcreteDecoratorA extends Decorator {

	// 本类的独有属性，区别于ConcreteDecoratorB
	private String addedState;

	public ConcreteDecoratorA(Component component) {
		super(component);
	}

	@Override
	public void Operation() {
		System.out.println("This is ConcreteDecoratorA.");
		component.Operation();
		addedState = "Decorate A ...";
		System.out.println(addedState);
	}

}
