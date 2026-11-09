import { getDb, isMongoConfigured } from "./mongodb";

type ClickDoc = { _id: string; count: number; updatedAt: Date };

const COLLECTION = "clicks";

export async function incrementClick(linkId: string): Promise<number> {
  const db = await getDb();
  const result = await db.collection<ClickDoc>(COLLECTION).findOneAndUpdate(
    { _id: linkId },
    { $inc: { count: 1 }, $set: { updatedAt: new Date() } },
    { upsert: true, returnDocument: "after" },
  );
  return result?.count ?? 0;
}

export async function getClickCounts(): Promise<Record<string, number>> {
  if (!isMongoConfigured()) return {};
  try {
    const db = await getDb();
    const docs = await db.collection<ClickDoc>(COLLECTION).find().toArray();
    return Object.fromEntries(docs.map((d) => [d._id, d.count]));
  } catch (error) {
    console.error("클릭 수 조회 실패:", error);
    return {};
  }
}
