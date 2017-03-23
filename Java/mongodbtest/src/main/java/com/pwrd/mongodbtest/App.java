package com.pwrd.mongodbtest;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.model.Filters;


/**
 *
 *
 */
public class App
{
	public static void main( String args[] ) {
		MongoClient mongoClient = null;
		try {
			// 连接到 mongodb 服务
			mongoClient = new MongoClient("localhost" , 27017);

			// 连接到数据库
			MongoDatabase mongoDatabase = mongoClient.getDatabase("slg");
			System.out.println("Connect to database successfully.");

			MongoCollection<Document> collection = mongoDatabase.getCollection("mycol");
			System.out.println("Collection selected.");

			//删除符合条件的第一个文档
			collection.deleteOne(Filters.eq("likes", 200));
			//删除所有符合条件的文档
			collection.deleteMany(Filters.eq("likes", 200));

			//检索查看结果
			FindIterable<Document> findIterable = collection.find();
			MongoCursor<Document> mongoCursor = findIterable.iterator();
			for (;mongoCursor.hasNext();) {
				System.out.println(mongoCursor.next());
			}
		} catch(Exception e) {
			System.err.println( e.getClass().getName() + ": " + e.getMessage() );
		} finally{
			mongoClient.close();
		}
	}
}

