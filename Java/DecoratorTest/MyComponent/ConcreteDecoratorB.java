/**
 * 具体的装饰产品类，起到给Component添加职责的功能
 */

public class ConcreteDecoratorB extends Decorator{

	public ConcreteDecoratorB(Component component) {
		super(component);
	}

	@Override
	public void Operation() {
		System.out.println("This is ConcreteDecoratorB.");
		component.Operation();
		AddedBehavior();
	}

	private void AddedBehavior() {
		System.out.println("Decorate B ...");
	}
}
