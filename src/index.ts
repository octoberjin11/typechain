import crypto from "crypto";

interface BlockShape {
  hash: string;
  prevHash: string;
  height: number;
  data: string;
}
class Block implements BlockShape {
  public hash: string;
  constructor(
    // 1. 블록을 생성
    public prevHash: string,
    public height: number,
    public data: string
  ) {
    // 2. 블록의 데이터 받기
    this.hash = Block.calculateHash(prevHash, height, data);
  }
  static calculateHash(prevHash: string, height: number, data: string) {
    // 3. 받은 데이터의 해쉬값을 여기서 생성
    const toHash = `${prevHash}${height}${data}`;
    return crypto.createHash("sha256").update(toHash).digest("hex");
  }
}
