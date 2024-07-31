import dayjs from "dayjs";
import {
  fonts,
  zoom2ColumnWidth,
  zoom2HeaderMiddleRowHeight,
  zoom2HeaderTopRowHeight
} from "@/constants";
import { Day } from "@/types/global";
import { drawRow } from "../../drawRow";

export const drawZoom2DaysInMiddle = (
  ctx: CanvasRenderingContext2D,
  cols: number,
  startDate: Day
) => {
  const daysInRange = Math.floor(cols / 24) + 2;

  const width = 24 * zoom2ColumnWidth;

  const startDateHour = dayjs(
    `${startDate.year}-${startDate.month + 1}-${startDate.dayOfMonth}T${startDate.hour}:00:00`
  );

  const xPosOffset = -startDateHour.hour() * zoom2ColumnWidth;
  let xPos = xPosOffset + 0.5 * zoom2ColumnWidth;

  for (let i = 0; i < daysInRange; i++) {
    const dayLabel = dayjs(`${startDate.year}-${startDate.month + 1}-${startDate.dayOfMonth}`)
      .add(i, "day")
      .format("dddd DD.MM.YYYY")
      .toUpperCase();

    drawRow({
      ctx,
      x: xPos,
      y: zoom2HeaderTopRowHeight,
      width,
      height: zoom2HeaderMiddleRowHeight,
      textYPos: zoom2HeaderTopRowHeight + zoom2HeaderMiddleRowHeight / 2 + 2,
      label: dayLabel,
      font: fonts.bottomRow.number
    });
    xPos += width;
  }
};