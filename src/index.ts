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

class Blockchain {
  private blocks: Block[];
  constructor() {
    this.blocks = [];
  }

  //이전 해쉬값 불러오는 함수
  private getPrevHash() {
    if (this.blocks.length === 0) return ""; //블록의 길이가 0이라면 첫번째 해쉬가 없으므로 ""을 리턴함
    return this.blocks[this.blocks.length - 1].hash; //블록의 길이가 0이 아니라면 마지막 블럭의 해쉬값을 리턴함
  }
  public addBlock(data: string) {
    //새로운 블록 생성
    const newBlock = new Block(
      this.getPrevHash(), //새로운 블록을 생성하려면 이전 해쉬값이 필요하니까 getPrevHash 불러옴.
      this.blocks.length + 1, //블록의 height
      data
    );

    //새로 생성한 블록을 blocks 배열에 넣어줌
    this.blocks.push(newBlock);
  }

  //블록에 접근할 수 있는 함수
  public getBlocks() {
    //this.blocks은 블록체인 안의 블록 정보이고 private 값이다
    //아래와 같이 리턴하면 보안상에 문제가 있을 수 있음!!!
    //return this.blocks;

    //위와 같은 보안상의 이유로 아래와 같이 배열 안에 있는 데이터를 가진 새로운 배열로 리턴해줌
    return [...this.blocks];
  }
}

//새로운 블록체인 생성
const blockchain = new Blockchain();

//새로운 블록 추가
blockchain.addBlock("First one");
blockchain.addBlock("Second one");
blockchain.addBlock("Third one");
blockchain.addBlock("Fourth one");

//getBlocks에서 "return this.blocks"을 하면 생기는 문제점!
//아래와 같이 새로운 블록을 배열에 더할 수 있는 문제점이 있다
//blockchain.getBlocks().push(new Block("XXXX", 0000, "HACK!!!"));

//모든 블록 반환
console.log(blockchain.getBlocks());
