const prompt = require('prompt-sync')({sigint: true});
const clear = require('clear-screen');

const hat = '👑';
const hole = '⭐';
const fieldCharacter = '⬛';
const pathCharacter = '😍';


class Field {
  constructor(field) {
    this._field = field;
    this._row = 0;
    this._col = 0;    
    this._gameOver = false;
    // สุ่มที่เกิดหมวก
    const numRows = this._field.length;
    const numCols = this._field[0].length;
     let randomRow, randomCol;
    // สร้างเงื่อนไขและพื้นที่ห้ามเกิดหมวก
    do {
      randomRow = Math.floor(Math.random() * numRows);
      randomCol = Math.floor(Math.random() * numCols);
    } while (this.isForbiddenPosition(randomRow, randomCol));
    // วางหมวกในตำแหน่งที่สุ่มมา
    this._field[randomRow][randomCol] = hat;
  }
  
  isForbiddenPosition(row, col) {
    const forbiddenPositions = [
      [2, 13],
      [3, 13],
      [4, 13],
      [3, 19]
    ];
    // ตรวจสอบว่าอ้างอิงตำแหน่งห้ามเกิดถูกรึป่าว
    //   for (const [row, col] of forbiddenPositions) {
    //   this._field[row][col] = 'x';
    // }
    
    return forbiddenPositions.some(pos => pos[0] === row && pos[1] === col);
  

  }
  
// แสดงสถานะปัจจุบันของสนามบนหน้าจอ
  print() {
    clear();
    for (let row of this._field) {
      console.log(row.join(''));      
    }
  }
 
// // ตรวจสอบว่าออกนอกสนามรึป่าว
  isOutOfBounds(row, col) {
    return row < 0 || col < 0 || row >= this._field.length || col >= this._field[0].length;
  }
// // ตรวจสอบเป็นหลุมรึป่าว
  isHole(row, col) {
    return this._field[row][col] === hole;
  }
// // ตรวจสอบว่าเจอหมวกรึป่าว
  isHat(row, col) {
    return this._field[row][col] === hat;
  }
// ควบคุมตัวละครในทิศทางที่เรากำหนด
  move(direction) {
    let newRow = this._row;
    let newCol = this._col;

    switch (direction) {
      case 'w':
        newRow--;
        break;
      case 's':
        newRow++;
        break;
      case 'a':
        newCol--;
        break;
      case 'd':
        newCol++;
        break;
    }
// ตรวจสอบการเดินและแสดงผล
    if (this.isOutOfBounds(newRow, newCol)) {
      console.log('ออกนอกเส้นทาง!!');
      this._gameOver = true;
      return;
    }

    if (this.isHole(newRow, newCol)) {
      console.log('ด่อง!');
      this._gameOver = true;
      return;
    }

    if (this.isHat(newRow, newCol)) {
      console.log('ฉันนี่และราชาโจรสลัด!');
      this._gameOver = true;
      return;
    }
// ตำแหน่งปัจจุบันของเรา
    this._field[this._row][this._col] = fieldCharacter;
    this._row = newRow;
    this._col = newCol;
    this._field[this._row][this._col] = pathCharacter;
  }

  playGame() {
    while (!this._gameOver) {
      this.print();
      const direction = prompt('ไปทางไหนดี? (w=up, s=down, a=left, d=right): ');
      this.move(direction);
    }
  }
}
// อินสแตนซ์ของclass Field 
const myField = new Field([        
    [pathCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter],
    [fieldCharacter, hole, hole, hole, hole, fieldCharacter, fieldCharacter, fieldCharacter, hole, hole, fieldCharacter, fieldCharacter, hole, hole, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, hole, fieldCharacter, hole, fieldCharacter, fieldCharacter, fieldCharacter, hole, hole, hole, fieldCharacter, fieldCharacter, fieldCharacter],
    [fieldCharacter, fieldCharacter, fieldCharacter, hole, fieldCharacter, fieldCharacter, fieldCharacter, hole, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, hole, fieldCharacter, hole, fieldCharacter, fieldCharacter, hole, hole, hole, hole, hole, fieldCharacter, fieldCharacter, hole, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter],
    [fieldCharacter, fieldCharacter, fieldCharacter, hole, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, hole, fieldCharacter, fieldCharacter, fieldCharacter, hole, fieldCharacter, hole, fieldCharacter, fieldCharacter, fieldCharacter, hole, fieldCharacter, hole, fieldCharacter, fieldCharacter, fieldCharacter, hole, hole, hole, fieldCharacter, fieldCharacter, fieldCharacter],
    [fieldCharacter, fieldCharacter, fieldCharacter, hole, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, hole, fieldCharacter, fieldCharacter, hole, fieldCharacter, hole, fieldCharacter, fieldCharacter, hole, hole, hole, hole, hole, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, hole, fieldCharacter, fieldCharacter, fieldCharacter],
    [fieldCharacter, fieldCharacter, fieldCharacter, hole, fieldCharacter, fieldCharacter, fieldCharacter, hole, hole, fieldCharacter, fieldCharacter, fieldCharacter, hole, hole, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, hole, fieldCharacter, hole, fieldCharacter, fieldCharacter, fieldCharacter, hole, hole, hole, fieldCharacter, hole, fieldCharacter],
    [fieldCharacter, hole, fieldCharacter, hole, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter],
    [fieldCharacter, fieldCharacter, hole, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter],
    [fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter]        
]);

myField.playGame();