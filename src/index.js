const defaultOptions = {
	drink: 'milk',
	fries: 'steak'
}

const delays = {
	short: 100,
	medium: 500,
	long: 1000,
	xl: 2000,
}

///////////////// utils

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function clickButtonsFromList(list) {
	return new Promise(async (resolve, reject)=>{
		for (let i = 0; i < list.length; i++) {
			const {title, delay} = list[i]
			document.querySelector(`[aria-label="${title}"]`).click()
			if (delay > 0) {
				await sleep(delay)
			}
		}
		resolve()
	})
}

async function closeModalWithDelay(delay=0) {
	document.querySelector('[aria-label="Close dialog"]').parentElement.parentElement.click()
	if (delay > 0) {
		await sleep(delay)
	}
}

async function addToCartWithDelay(delay=0) {
	document.querySelector('[data-serve-element="addToCart"]').click()
	if (delay > 0) {
		await sleep(delay)
	}
}

async function clickMenuButtonWithName(name, delay=0) {
	// Click header with delay twice
	document.querySelector('[data-test-stickynav-button*="kidsember"]').click()
	await sleep(delay)
	document.querySelector('[data-test-stickynav-button*="kidsember"]').click()
	await sleep(delay)

	// Click button
	document.querySelector(`[alt="${name}"]`).click()
	await sleep(delay)
}

async function selectShirleyTemple(delay=0) {

	await clickButtonsFromList([{
		title:`Select Soft Drink`,delay:delays.medium
	}])
	let newValue = ""
	let newIndex = 0
	const parent = document.querySelector(`[aria-label="Select an option"]`)
	parent.click()
	for (let i = 0; i < parent.children.length; i++) {
		const option = parent.children[i]
		if (option.innerHTML.trim().toLowerCase().includes('shirley')) {
			newValue = option.value
			newIndex = i
		}
	}

	if (newValue.length > 0) {
		//document.querySelector(`[aria-label="Select an option"]`).selectedIndex = newIndex

		//document.querySelector(`[aria-label="Select an option"]`).dispatchEvent(new Event('change'))
		document.querySelector(`[aria-label="Select an option"]`).value = newValue
		document.querySelector(`[aria-label="Deselect Soft Drink"]`).setAttribute("data-test-productcustomization-choice-name", newValue)
	}

	if (delay > 0) {
		await sleep(delay)
	}
}

///////////////// order functions

async function addKidsCheeseburgerToCart(options = defaultOptions) {
	const drink = options.drink || defaultOptions.drink
	const fries = options.fries || defaultOptions.fries

	await clickMenuButtonWithName("Red's Cheeseburger", delays.long)

	let buttonsList1 = [
		{title:`Select Extra Fries`,delay:delays.short},
		{title:`Select Milk`,delay:delays.short},
		{title:`Select Red's Cheeseburger Customizations`,delay:delays.medium},
		{title:`Edit Toppings`,delay:delays.medium},
		{title:`Select No Pickles`,delay:delays.short},
		{title:`Select No Tomatoes`,delay:delays.short0},
		{title:`Select No Shredded Lettuce`,delay:delays.short},
	]
	if (fries == 'sweet') {
		buttonsList1.push({title:`Select Sweet Potato Fries`,delay:delays.short})
	}
	const buttonsList2 = [
		{title:`Edit Add a Side Sauce`,delay:delays.medium},
		{title:`Select Ranch Dressing`,delay:delays.short},
		{title:`Select Whiskey River® BBQ Sauce`,delay:delays.short},
	]

	await clickButtonsFromList(buttonsList1)
	await closeModalWithDelay(delays.medium)
	console.log(drink)
	if (drink.includes('shirley')) {await selectShirleyTemple(delays.medium)}
	await clickButtonsFromList(buttonsList2)
	await closeModalWithDelay(delays.medium)
	await addToCartWithDelay(delays.long)
}

async function addKidsClucksToCart(options = defaultOptions) {
	const drink = options.drink || defaultOptions.drink
	const fries = options.fries || defaultOptions.fries

	await clickMenuButtonWithName("Cluck-A-Doodles", delays.long)

	// 3 piece selected by default
	let buttonsList1 = [
		{title:`Select Extra Fries`,delay:delays.short},
		{title:`Select Milk`,delay:delays.short},
	]
	if (fries == 'sweet') {
		buttonsList1.push({title:`Select Sweet Potato Fries`,delay:delays.short})
	}
	const buttonsList2 = [
		{title:`Edit Add a Side Sauce`,delay:delays.medium},
		{title:`Select Campfire Mayo`,delay:delays.short},
		{title:`Select Ranch Dressing`,delay:delays.medium},
	]

	await clickButtonsFromList(buttonsList1)
	if (drink.includes('shirley')) {await selectShirleyTemple(delays.medium)}
	await clickButtonsFromList(buttonsList2)
	await closeModalWithDelay(delays.medium)
	await addToCartWithDelay(delays.long)
}

////////////// actual orders
// Parameter options:
// 1: drink: milk | shirkeyTemple
// 2: fries: steak | sweet

await addKidsCheeseburgerToCart({drink:'milk',fries:'steak'})
await addKidsCheeseburgerToCart({drink:'milk',fries:'steak'})
await addKidsClucksToCart({drink:'shirley',fries:'sweet'})
document.querySelector(`[aria-label*="items in cart"]`).click()

const msg = "Make sure you edit any orders with soda, as they all contain Coca Cola only."
console.log(msg)
