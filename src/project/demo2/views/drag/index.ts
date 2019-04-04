import { Vue, Component } from 'vue-property-decorator';

class ListItem {
  public static uid = 0;
  public id: number = 0;
  public text: string = 'item';
  public isDragging: boolean = false;
  public isDragEnter: boolean = false;

  public constructor() {
    this.id = ListItem.uid++;
  }
}

const list: ListItem[] = [];
for (let i = 0; i < 20; i++) {
  list.push(new ListItem());
}

let dragIndex = 0;
let dragItem: ListItem | null = null;

@Component({
  filters: {
    doubleNumberString(value: number): string {
      return (value > 9 ? value : ('0' + value)) + '';
    }
  }
})
export default class Drag extends Vue {
  public list: ListItem[] = list;
  public intervalId: ReturnType<typeof setInterval> | null = null;

  public getRandomIndex(): number {
    return Math.floor(Math.random() * this.list.length);
  }

  public onDragStart(item: ListItem, index: number): void {
    dragIndex = index;
    dragItem = item;
    item.isDragging = true;
  }

  public onDragEnd(item: ListItem): void {
    dragItem = null;
    item.isDragging = false;
  }

  public onDrop(item: ListItem): void {
    item.isDragging = false;
    item.isDragEnter = false;
  }

  public onDragEnter(item: ListItem, index: number): void {
    if (dragItem && dragItem !== item) {
      this.list[index] = dragItem;
      this.list[dragIndex] = item;
      dragIndex = index;
      item.isDragEnter = true;
    }
  }

  public onDragLeave(item: ListItem): void {
    item.isDragEnter = false;
  }

  public onClickAdd(): void {
    this.list.splice(this.getRandomIndex(), 0, new ListItem());
  }

  public onClickDelete(): void {
    this.list.splice(this.getRandomIndex(), 1);
  }

  public onClickShuffleBtn(): void {
    const newList: ListItem[] = [];
    const length = this.list.length;
    this.list.forEach((item): void => {
      let randomIndex = this.getRandomIndex();
      let exist = false;
      do {
        if (newList[randomIndex] === undefined) {
          exist = false;
          newList[randomIndex] = item;
        } else {
          randomIndex = (randomIndex + 1) % length;
          exist = true;
        }
      } while (exist);
    });
    this.list = newList;
  }

  public onClickTimingShuffleBtn(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    } else {
      this.intervalId = setInterval((): void => {
        this.onClickShuffleBtn();
      }, 3000);
    }
  }
};
