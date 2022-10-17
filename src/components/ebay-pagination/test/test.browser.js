import { expect, use } from 'chai';
import chaiDom from 'chai-dom';
import { render, fireEvent, cleanup } from '@marko/testing-library';
import { composeStories } from '@storybook/marko/dist/testing';
import * as stories from '../pagination.stories';
import { getPaginationItems } from '../../../common/test-utils/shared';

const { Buttons, Links } = composeStories(stories);

const { a11yNextText, a11yPreviousText } = Buttons.args;

use(chaiDom);
afterEach(cleanup);

/** @type import("@marko/testing-library").RenderResult */
let component;

describe('given the pagination is rendered', () => {
    describe('with links', () => {
        beforeEach(async () => {
            component = await render(Links, { items: getPaginationItems(6, true) });
        });

        thenItCanBeInteractedWith();
    });

    describe('with buttons', () => {
        beforeEach(async () => {
            component = await render(Buttons, { items: getPaginationItems(6) });
        });

        thenItCanBeInteractedWith();
    });

    function thenItCanBeInteractedWith() {
        describe('when the previous button is activated', () => {
            describe('via click', () => {
                beforeEach(async () => {
                    await fireEvent.click(component.getByLabelText(a11yPreviousText), {
                        detail: 1,
                    });
                });

                thenItEmittedThePaginationPreviousEvent();
            });

            function thenItEmittedThePaginationPreviousEvent() {
                it('then it emits the previous event', () => {
                    const previousEvents = component.emitted('previous');
                    expect(previousEvents).has.length(1);

                    const [[eventArg]] = previousEvents;
                    expect(eventArg).has.property('originalEvent').instanceOf(Event);
                    expect(eventArg).has.property('el').instanceOf(HTMLElement);
                });
            }
        });

        describe('when the next button is activated', () => {
            describe('via click', () => {
                beforeEach(async () => {
                    await fireEvent.click(component.getByLabelText(a11yNextText), {
                        detail: 1,
                    });
                });

                thenItEmittedThePaginationNextEvent();
            });

            function thenItEmittedThePaginationNextEvent() {
                it('then it emits the next event', () => {
                    const nextEvents = component.emitted('next');
                    expect(nextEvents).has.length(1);

                    const [[eventArg]] = nextEvents;
                    expect(eventArg).has.property('originalEvent').instanceOf(Event);
                    expect(eventArg).has.property('el').instanceOf(HTMLElement);
                });
            }
        });

        describe('when the item number is activated', () => {
            describe('via click', () => {
                beforeEach(async () => {
                    await fireEvent.click(component.getByText('item 2'), {
                        detail: 1,
                    });
                });

                thenItEmittedThePaginationSelectEvent();
            });

            function thenItEmittedThePaginationSelectEvent() {
                it('then it emits the select event', () => {
                    const selectEvents = component.emitted('select');
                    expect(selectEvents).has.length(1);

                    const [[eventArg]] = selectEvents;
                    expect(eventArg).has.property('originalEvent').instanceOf(Event);
                    expect(eventArg).has.property('el').instanceOf(HTMLElement);
                    expect(eventArg).has.property('value', 'item 2');
                });
            }
        });
    }
});

describe('given the pagination is rendered with disabled controls', () => {
    beforeEach(async () => {
        component = await render(Links, { items: getPaginationItems(1, true, null, true) });
    });

    describe('when the previous button is activated', () => {
        describe('via click', () => {
            beforeEach(async () => {
                await fireEvent.click(component.getByLabelText(a11yPreviousText), {
                    detail: 1,
                });
            });

            thenItDidNotEmitThePaginationPreviousEvent();
        });

        function thenItDidNotEmitThePaginationPreviousEvent() {
            it('then it does not emit the previous event', () => {
                expect(component.emitted('previous')).has.length(0);
            });
        }
    });

    describe('when the next button is activated', () => {
        describe('via click', () => {
            beforeEach(async () => {
                await fireEvent.click(component.getByLabelText(a11yNextText), {
                    detail: 1,
                });
            });

            thenItDidNotEmitThePaginationNextEvent();
        });

        function thenItDidNotEmitThePaginationNextEvent() {
            it('then it does not emit the next event', () => {
                expect(component.emitted('next')).has.length(0);
            });
        }
    });
});

describe('given the pagination is rendered at various sizes', () => {
    [
        {
            name: 'with the second item selected',
            input: { items: getPaginationItems(9, true, 1) },
            cases: [
                {
                    width: 330,
                    expect: [0, 5],
                },
                {
                    width: 430,
                    expect: [0, 7],
                },
                {
                    width: 640,
                    expect: [0, 9],
                },
            ],
        },
        {
            name: 'with the fifth item selected',
            input: { items: getPaginationItems(9, true, 4) },
            cases: [
                {
                    width: 330,
                    expect: [2, 7],
                },
                {
                    width: 380,
                    expect: [2, 8],
                },
                {
                    width: 430,
                    expect: [1, 8],
                },
                {
                    width: 640,
                    expect: [0, 9],
                },
            ],
        },
        {
            name: 'with the eighth item selected',
            input: { items: getPaginationItems(9, true, 7) },
            cases: [
                {
                    width: 330,
                    expect: [4, 9],
                },
                {
                    width: 430,
                    expect: [2, 9],
                },
                {
                    width: 640,
                    expect: [0, 9],
                },
            ],
        },
        {
            name: 'first item and dots',
            input: { items: getPaginationItems(16, true, 1), variant: 'show-last' },
            cases: [
                {
                    width: 330,
                    expect: [0, 3, 15],
                },
                {
                    width: 430,
                    expect: [0, 5, 15],
                },
                {
                    width: 640,
                    expect: [0, 7, 15],
                },
            ],
            dots: true,
        },
        {
            name: 'with the seventh item selected and dots',
            input: { items: getPaginationItems(16, true, 7), variant: 'show-last' },
            cases: [
                {
                    width: 330,
                    expect: [5, 8, 15],
                },
                {
                    width: 380,
                    expect: [5, 9, 15],
                },
                {
                    width: 430,
                    expect: [4, 9, 15],
                },
                {
                    width: 640,
                    expect: [3, 10, 15],
                },
            ],
            dots: true,
        },
        {
            name: 'with the 3rd to last item selected and hidden dots',
            input: { items: getPaginationItems(16, true, 13), variant: 'show-last' },
            cases: [
                {
                    width: 330,
                    expect: [11, 16],
                },
                {
                    width: 430,
                    expect: [9, 16],
                },
                {
                    width: 640,
                    expect: [7, 16],
                },
            ],
            dots: false,
        },
        {
            name: 'with the last item selected and hidden dots',
            input: { items: getPaginationItems(16, true, 15), variant: 'show-last' },
            cases: [
                {
                    width: 330,
                    expect: [11, 16],
                },
                {
                    width: 430,
                    expect: [9, 16],
                },
                {
                    width: 640,
                    expect: [7, 16],
                },
            ],
            dots: false,
        },
        {
            name: 'hidden dots',
            input: { items: getPaginationItems(5, true, 1), variant: 'show-last' },
            cases: [
                {
                    width: 330,
                    expect: [0, 5],
                },
                {
                    width: 430,
                    expect: [0, 5],
                },
                {
                    width: 640,
                    expect: [0, 5],
                },
            ],
            dots: false,
        },
    ].forEach(({ name, input, cases, dots }) => {
        describe(name, () => {
            beforeEach(async () => {
                component = await render(Links, input);
            });

            cases.forEach(({ width, expect: [from, to, last] }) => {
                describe(`when it is ${width} wide`, () => {
                    beforeEach(async () => {
                        component.container.style.width = `${width}px`;
                        await fireEvent(window, new Event('resize'));
                        // Wait one frame for the resize util to emit.
                        await new Promise((resolve) => requestAnimationFrame(resolve));
                        // Wait a setTimeout for Marko to finish rendering.
                        await new Promise((resolve) => setTimeout(resolve));
                    });

                    it(`then it shows items ${from} through ${to}`, () => {
                        input.items.slice(1, -1).forEach((itemData, i) => {
                            const itemEl = component.getByText(itemData.renderBody.text);
                            const isHidden = Boolean(itemEl.closest('[hidden]'));
                            expect(isHidden).to.equal(
                                (i < from || i >= to) && last !== i,
                                `item ${i} should be ${isHidden ? 'visible' : 'hidden'}`
                            );
                        });
                    });
                    if (typeof dots === 'boolean') {
                        it(`should ${dots ? 'show' : 'hide'} the dots`, () => {
                            const dotsEl = component.getByRole('separator', { hidden: true });
                            const isHidden = Boolean(dotsEl.closest('[hidden]'));
                            expect(isHidden).to.equal(
                                !dots,
                                `dots should be ${isHidden ? 'visible' : 'hidden'}`
                            );
                        });
                    }
                });
            });
        });
    });
});
