module.exports = function addEventsOnSearch(el){
	el.addEventListener('click',(e) => {
		e.stopPropagation();
		e.preventDefault();
		el.classList.add('active')
	});
	document.addEventListener('click',()=>{
		el.classList.remove('active')
	})
}
