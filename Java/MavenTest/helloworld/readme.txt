http://www.oracle.com/technetwork/cn/community/java/apache-maven-getting-started-1-406235-zhs.html

Follow these steps to compile and run the project:
$ mvn archetype:generate -DgroupId=com.mycompany.helloworld -DartifactId=helloworld -Dpackage=com.mycompany.helloworld
$ mvn package
$ java -cp target/helloworld-1.0-SNAPSHOT.jar com.mycompany.helloworld.App

