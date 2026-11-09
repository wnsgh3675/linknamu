import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB ?? "linknamu";

// 개발 모드의 HMR에서도 연결을 재사용하기 위해 global에 캐시합니다.
const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
};

export function isMongoConfigured(): boolean {
  return Boolean(uri);
}

export async function getDb() {
  if (!uri) {
    throw new Error("MONGODB_URI 환경 변수가 설정되지 않았습니다 (.env.local 확인).");
  }
  if (!globalForMongo._mongoClientPromise) {
    globalForMongo._mongoClientPromise = new MongoClient(uri).connect().catch((err) => {
      // 연결 실패 시 다음 요청에서 다시 시도할 수 있도록 캐시를 비웁니다.
      globalForMongo._mongoClientPromise = undefined;
      throw err;
    });
  }
  const client = await globalForMongo._mongoClientPromise;
  return client.db(dbName);
}
