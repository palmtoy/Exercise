1) Compile the ‘.java' class, for example ‘HelloWorld.java' with
javac HelloWorld.java

2) This will produce a ‘.class' file needed for the JAR file.

3) Next create a manifest file (saving as ‘Manifest.txt') using vim and input the following:
Main-Class: HelloWorld

4) Next create the JAR file using this code:
jar cfm HelloWorld.jar Manifest.txt HelloWorld.class

5) Run the file:
java -jar HelloWorld.jar

6) clear 'run-jar.sh':
del all chars below '__JAR_FOLLOW__'

7) using this code put binary file 'HelloWorld.jar' to 'run-jar.sh'
cat HelloWorld.jar >> run-jar.sh

