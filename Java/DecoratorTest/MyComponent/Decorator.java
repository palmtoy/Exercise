/**
 * 装饰抽象类，实现了Component，从外类来扩展Component类的功能，
 * 但对于Component来说，是无需知道Decorator存在的
 */

public abstract class Decorator implements Component{

	Component component = null;

	//构造函数，引入component对象
	public Decorator(Component component) {
		this.component = component;
	}

	/**
	 * 重写Operation方法
	 */
	@Override
	public void Operation() {
		System.out.println("This is Decorator.");
		if(component != null) {
			component.Operation();
		}		
	}

}	
