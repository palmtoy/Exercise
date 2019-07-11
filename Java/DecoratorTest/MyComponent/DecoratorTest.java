public class DecoratorTest {

	public static void main(String[] args) {

		Component component = new ConcreteComponent();
		component.Operation();

		System.out.println("<--------------------------->\n");

		Component component1 = new ConcreteDecoratorA(new ConcreteComponent());
		component1.Operation();

		System.out.println("<--------------------------->\n");

		Component component2 = new ConcreteDecoratorB(new ConcreteComponent());
		component2.Operation();

	}

}

