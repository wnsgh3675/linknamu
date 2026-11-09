import { links } from "@/data/profile";
import { incrementClick } from "@/lib/clicks";
import { isMongoConfigured } from "@/lib/mongodb";

const validIds = new Set(links.map((l) => l.id));

export async function POST(request: Request) {
  let id: unknown;
  try {
    ({ id } = await request.json());
  } catch {
    return Response.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  if (typeof id !== "string" || !validIds.has(id)) {
    return Response.json({ error: "존재하지 않는 링크입니다." }, { status: 400 });
  }

  if (!isMongoConfigured()) {
    return Response.json({ error: "DB가 설정되지 않았습니다." }, { status: 503 });
  }

  try {
    const count = await incrementClick(id);
    return Response.json({ id, count });
  } catch (error) {
    console.error("클릭 수 저장 실패:", error);
    return Response.json({ error: "클릭 수 저장에 실패했습니다." }, { status: 500 });
  }
}
