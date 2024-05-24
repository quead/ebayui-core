import Expander from "makeup-expander";
import { type DayISO, dateArgToISO } from "../../common/dates/date-utils";
import type { WithNormalizedProps } from "../../global";
import type { AttrString } from "marko/tags-html";
import type { Input as TextboxInput } from "../ebay-textbox/component-browser";
import { parse } from "../../common/dates";

const MIN_WIDTH_FOR_DOUBLE_PANE = 600;

interface DateTextboxInput {
    value?: Date | number | string;
    rangeEnd?: Date | number | string;
    locale?: string;
    range?: boolean;
    textbox?: Marko.RepeatableAttrTag<TextboxInput>;
    todayISO?: Date | number | string;
    disabled?: boolean;
    "disable-before"?: Date | number | string;
    "disable-after"?: Date | number | string;
    "disable-weekdays"?: number[];
    "disable-list"?: (Date | number | string)[];
    /** @deprecated use `@textbox-input` instead */
    "input-placeholder-text"?: string | [string, string];
    "collapse-on-select"?: boolean;
    "get-a11y-show-month-text"?: (monthName: string) => string;
    "a11y-open-popover-text"?: AttrString;
    "a11y-selected-text"?: AttrString;
    "a11y-range-start-text"?: AttrString;
    "a11y-in-range-text"?: AttrString;
    "a11y-range-end-text"?: AttrString;
    "a11y-separator"?: string;
    /** @deprecated use `@textbox-input` instead */
    "floating-label"?: string | [string, string];
    /** @deprecated will be default in next major */
    localizeFormat?: boolean;
    "on-change"?: (
        event:
            | { selected: DayISO | null }
            | { rangeStart: DayISO | null; rangeEnd: DayISO | null },
    ) => void;
    "on-invalid-date"?: () => void;
}

export interface Input extends WithNormalizedProps<DateTextboxInput> {}

interface State {
    numMonths: number;
    firstSelected: DayISO | null;
    secondSelected: DayISO | null;
    popover: boolean;
}

class DateTextbox extends Marko.Component<Input, State> {
    declare expander: any;

    onCreate() {
        this.state = {
            numMonths: 1,
            firstSelected: null,
            secondSelected: null,
            popover: false,
        };

        if (typeof document !== "undefined") {
            this.calculateNumMonths();
        }
    }

    onMount() {
        this.expander = new Expander(this.el, {
            hostSelector: ".ebay-date-textbox--main > .icon-btn",
            contentSelector: ".date-textbox__popover",
            expandOnClick: true,
            autoCollapse: true,
        });
    }

    onDestroy() {
        this.expander?.destroy();
    }

    onInput(input: Input) {
        if (input.value !== undefined) {
            this.state.firstSelected = dateArgToISO(input.value);
        }
        if (input.rangeEnd) {
            this.state.secondSelected = dateArgToISO(input.rangeEnd);
        }
        if (!input.range) {
            this.state.secondSelected = null;
        }
    }

    calculateNumMonths() {
        this.state.numMonths =
            document.documentElement.clientWidth < MIN_WIDTH_FOR_DOUBLE_PANE
                ? 1
                : 2;
    }

    handleInputChange(index: number, { value }: { value: string }) {
        let iso: DayISO | null;
        /* next major, localizeFormat will _always_ be true */
        if (this.input.localizeFormat) {
            iso = parse(value, this.input.locale);
        } else {
            const date = new Date(value);
            iso = isNaN(date.getTime()) ? null : dateArgToISO(date);
        }

        if (iso === null) {
            this.emit("invalid-date");
            return;
        }

        if (index === 0) {
            this.state.firstSelected = iso;
        } else {
            this.state.secondSelected = iso;
        }
        this.emitSelectedChange();
    }

    openPopover() {
        this.state.popover = true;
    }

    closePopover() {
        this.state.popover = false;
    }

    onPopoverSelect({ iso }: { iso: DayISO }) {
        const { firstSelected, secondSelected } = this.state;

        this.state.firstSelected = iso;

        if (this.input.range) {
            const selected = firstSelected || secondSelected;

            if (firstSelected && secondSelected) {
                // both were selected; reset selection
                this.state.secondSelected = null;
            } else if (selected) {
                // exactly one was selected; figure out the order
                if (selected < iso) {
                    this.state.firstSelected = selected;
                    this.state.secondSelected = iso;
                } else {
                    this.state.secondSelected = selected;
                }
                if (this.input.collapseOnSelect) {
                    this.expander.expanded = false;
                }
            }
        } else if (this.input.collapseOnSelect) {
            this.expander.expanded = false;
        }

        this.emitSelectedChange();
    }

    emitSelectedChange() {
        this.emit(
            "change",
            this.input.range
                ? {
                      rangeStart: this.state.firstSelected,
                      rangeEnd: this.state.secondSelected,
                  }
                : {
                      selected: this.state.firstSelected,
                  },
        );
    }
}

export default DateTextbox;
