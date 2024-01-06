import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import blackLogo from "../../assets/black-pawn.png";
import whiteLogo from "../../assets/white-pawn.png";

export class Pawn extends Figure {
    isFirstStep: boolean = true;

    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.PAWN;
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)) {
            return false;
        }
        const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1;
        const firstStepDirection = this.cell.figure?.color === Colors.BLACK ? 2 : -2;

        if ((target.y === this.cell.y + direction || this.isFirstStep
                && (target.y === this.cell.y + firstStepDirection)) // проверка смещения на 1 или на 2 (если это 1 шаг)
            && target.x === this.cell.x // смещение идет всегда по одной полосе x
            && this.cell.board.getCell(target.x, target.y).isEmpty()) { // поле на которое мы хотим перейти - пустая
            return true;
        }

        if (target.y === this.cell.y + direction // проверка что мы двигаемся либо на 1 ячейку вверх или вниз
                && (target.x === this.cell.x + 1 || target.x === this.cell.x - 1) // также смещаемся по x на 1 поле
            && this.cell.isEnemy(target)) { // на этом поле стоит враг
            return true;
        }
        return false;
    }

    moveFigure(target: Cell) {
        super.moveFigure(target);
        this.isFirstStep = false;
    }
}