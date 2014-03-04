function Cat(cat, owner) {
	this.cat = cat;
	this.owner = owner;
}

Cat.prototype.cuteStatement = function() {
	return console.log(this.cat + " loves " + this.owner);
};

cat1 = new Cat("Breakfast", "Jeff");

cat2 = new Cat("Funny", "Steve");

cat1.cuteStatement();
cat2.cuteStatement();

Cat.prototype.cuteStatement = function() {
	return console.log("Everyone loves " + this.cat + "!");
};

cat1.cuteStatement();
cat2.cuteStatement();

Cat.prototype.meow = function() {
	console.log("Meow!");
}
cat1.meow();
cat2.meow();

cat1.meow = function () {
	console.log("Roar!");
}

cat1.meow();
cat2.meow();