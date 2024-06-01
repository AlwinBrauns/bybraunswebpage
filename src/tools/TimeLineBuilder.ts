export interface TimelineItem {
    type: 'point' | 'line';
    date?: string;
    title?: string;
    description?: string;
    rowStart: number;
    rowEnd: number;
}

class TimelineBuilder {
    private timeline: TimelineItem[];
    private currentRow: number;

    constructor() {
        this.timeline = [];
        this.currentRow = 1;
    }

    addPoint(date: string, title: string, description: string): this {
        const point: TimelineItem = {
            type: 'point',
            date,
            title,
            description,
            rowStart: this.currentRow,
            rowEnd: this.currentRow + 4,
        };
        this.timeline.push(point);
        this.currentRow += 4;
        return this;
    }

    addLines(numberOfLines: number): this {
        for (let i = 0; i < numberOfLines; i++) {
            this.timeline.push({
                type: 'line',
                rowStart: this.currentRow,
                rowEnd: this.currentRow + 1,
            });
            this.currentRow++;
        }
        return this;
    }

    build(): TimelineItem[] {
        return this.timeline;
    }
}

export default TimelineBuilder;
