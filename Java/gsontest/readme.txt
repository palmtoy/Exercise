(1) How to create package ?
	$ mvn clean package


(2) How to run it with remote debug listening feature ?
	$ java -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005 -cp target/gsontest-1.0.jar:/home/lzg/.m2/repository/net/sf/json-lib/json-lib/2.4/json-lib-2.4-jdk15.jar:/home/lzg/.m2/repository/commons-beanutils/commons-beanutils/1.8.0/commons-beanutils-1.8.0.jar:/home/lzg/.m2/repository/commons-collections/commons-collections/3.2.1/commons-collections-3.2.1.jar:/home/lzg/.m2/repository/commons-lang/commons-lang/2.5/commons-lang-2.5.jar:/home/lzg/.m2/repository/commons-logging/commons-logging/1.1.1/commons-logging-1.1.1.jar:/home/lzg/.m2/repository/net/sf/ezmorph/ezmorph/1.0.6/ezmorph-1.0.6.jar:/home/lzg/.m2/repository/commons-io/commons-io/2.5/commons-io-2.5.jar com.pwrd.gsontest.App

	OR:

	$ java -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005 -cp target/classes:/home/lzg/.m2/repository/net/sf/json-lib/json-lib/2.4/json-lib-2.4-jdk15.jar:/home/lzg/.m2/repository/commons-beanutils/commons-beanutils/1.8.0/commons-beanutils-1.8.0.jar:/home/lzg/.m2/repository/commons-collections/commons-collections/3.2.1/commons-collections-3.2.1.jar:/home/lzg/.m2/repository/commons-lang/commons-lang/2.5/commons-lang-2.5.jar:/home/lzg/.m2/repository/commons-logging/commons-logging/1.1.1/commons-logging-1.1.1.jar:/home/lzg/.m2/repository/net/sf/ezmorph/ezmorph/1.0.6/ezmorph-1.0.6.jar:/home/lzg/.m2/repository/commons-io/commons-io/2.5/commons-io-2.5.jar com.pwrd.gsontest.App

