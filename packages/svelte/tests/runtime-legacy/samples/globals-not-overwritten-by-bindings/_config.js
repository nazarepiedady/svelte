import { flushSync } from 'svelte';
import { ok, test } from '../../test';

export default test({
	html: `
		<div class="todo done">
			<input type="checkbox">
			<input type="text">
		</div>

		<div class="todo done">
			<input type="checkbox">
			<input type="text">
		</div>

		<div class="todo ">
			<input type="checkbox">
			<input type="text">
		</div>
	`,

	ssrHtml: `
		<div class="todo done">
			<input type="checkbox" checked>
			<input type="text" value="Buy some milk">
		</div>

		<div class="todo done">
			<input type="checkbox" checked>
			<input type="text" value="Do the laundry">
		</div>

		<div class="todo ">
			<input type="checkbox">
			<input type="text" value="Find life's true purpose">
		</div>
	`,

	get props() {
		return {
			todos: {
				first: { description: 'Buy some milk', done: true },
				second: {
					description: 'Do the laundry',
					done: true
				},
				third: {
					description: "Find life's true purpose",
					done: false
				}
			}
		};
	},

	test({ assert, component, target, window }) {
		const input = /** @type {HTMLInputElement} */ (
			document.querySelectorAll('input[type="checkbox"]')[2]
		);
		const change = new window.Event('change');

		input.checked = true;
		input.dispatchEvent(change);
		flushSync();

		assert.ok(component.todos.third.done);
		assert.htmlEqual(
			target.innerHTML,
			`
			<div class="todo done">
				<input type="checkbox">
				<input type="text">
			</div>

			<div class="todo done">
				<input type="checkbox">
				<input type="text">
			</div>

			<div class="todo done">
				<input type="checkbox">
				<input type="text">
			</div>
		`
		);
	}
});
