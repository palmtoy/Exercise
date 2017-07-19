(1) How to create package?
	$ mvn package

(2) How to run it?
	$ java -classpath target/gsontest-1.0.jar:/home/lzg/.m2/repository/net/sf/json-lib/json-lib/2.4/json-lib-2.4-jdk15.jar:/home/lzg/.m2/repository/commons-beanutils/commons-beanutils/1.8.0/commons-beanutils-1.8.0.jar:/home/lzg/.m2/repository/commons-collections/commons-collections/3.2.1/commons-collections-3.2.1.jar:/home/lzg/.m2/repository/commons-lang/commons-lang/2.5/commons-lang-2.5.jar:/home/lzg/.m2/repository/commons-logging/commons-logging/1.1.1/commons-logging-1.1.1.jar:/home/lzg/.m2/repository/net/sf/ezmorph/ezmorph/1.0.6/ezmorph-1.0.6.jar com.pwrd.gsontest.App

	$ java -classpath target/classes:/home/lzg/.m2/repository/net/sf/json-lib/json-lib/2.4/json-lib-2.4-jdk15.jar:/home/lzg/.m2/repository/commons-beanutils/commons-beanutils/1.8.0/commons-beanutils-1.8.0.jar:/home/lzg/.m2/repository/commons-collections/commons-collections/3.2.1/commons-collections-3.2.1.jar:/home/lzg/.m2/repository/commons-lang/commons-lang/2.5/commons-lang-2.5.jar:/home/lzg/.m2/repository/commons-logging/commons-logging/1.1.1/commons-logging-1.1.1.jar:/home/lzg/.m2/repository/net/sf/ezmorph/ezmorph/1.0.6/ezmorph-1.0.6.jar com.pwrd.gsontest.App

	With 'data.json' ->
	$ java -classpath target/gsontest-1.0.jar:target/classes:/home/lzg/.m2/repository/net/sf/json-lib/json-lib/2.4/json-lib-2.4-jdk15.jar:/home/lzg/.m2/repository/commons-beanutils/commons-beanutils/1.8.0/commons-beanutils-1.8.0.jar:/home/lzg/.m2/repository/commons-collections/commons-collections/3.2.1/commons-collections-3.2.1.jar:/home/lzg/.m2/repository/commons-lang/commons-lang/2.5/commons-lang-2.5.jar:/home/lzg/.m2/repository/commons-logging/commons-logging/1.1.1/commons-logging-1.1.1.jar:/home/lzg/.m2/repository/net/sf/ezmorph/ezmorph/1.0.6/ezmorph-1.0.6.jar com.pwrd.gsontest.App

