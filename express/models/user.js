const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	cart: {
		items: [
			{
				productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
				quantity: { type: Number, required: true }
			}
		]
	}
});

userSchema.methods.addToCart = function(product) {
	const cartProductIndex = this.cart.items.findIndex(cp => {
		return cp.productId.toString() === product._id.toString();
	});

	let newQuantity = 1;
	const updatedCartItems = [...this.cart.items];

	if (cartProductIndex >= 0) {
		newQuantity = this.cart.items[cartProductIndex].quantity + 1;
		updatedCartItems[cartProductIndex].quantity = newQuantity;
	}
	else {
		updatedCartItems.push({ productId: product._id, quantity: newQuantity });
	}

	this.cart = { items: updatedCartItems };
	return this.save();
};

module.exports = mongoose.model('User', userSchema);

// const getDB = require('./../utils/database').getDB;

// const mongodb = require('mongodb');
// const ObjectId = mongodb.ObjectId;

// class User {
//   constructor(name, email, cart, id) {
//     this.name = name;
//     this.email = email;
//     this.cart = cart; // Embedded documents - { items: [] }
//     this._id = ObjectId(id)
//   }

//   getCart() {
//     // Returns a fully populated cart
//     const db = getDB();
//     const productIds = this.cart.items.map((item) => {
//       return item.productId;
//     });

//     // console.log('** productIds: ', productIds);

//     return db.collection('products').find({
//       _id: {
//         $in: productIds
//       }
//     }).toArray().then(products => {
//       return products.map(p => {
//         return { ...p, quantity: this.cart.items.find(i => { return i.productId.toString() === p._id.toString() }).quantity };
//       });
//     }).catch(error => {
//       console.log('DB Error: ', error);
//     });
//   }

//   deleteItemFromCart(productId) {
//     const updatedCartItems = this.cart.items.filter(item => {
//       return item.productId.toString() !== productId.toString()
//     });

//     const db = getDB();
//     return db.collection('users').updateOne({
//       _id: this._id
//     }, {
//       $set: {
//         cart: {
//           items: updatedCartItems
//         }
//       }
//     });
//   }

//   addOrder() {
//     const db = getDB();

//     return this.getCart()
//       .then(products => {
//         const order = {
//           items: products,
//           user: {
//             _id: new ObjectId(this._id),
//             name: this.name
//           }
//         };

//         return db.collection('orders').insertOne(order);
//       })
//       .then(result => {
//         this.cart = { items: [] };

//         return db.collection('users').updateOne({
//           _id: this._id
//         }, {
//           $set: {
//             cart: {
//               items: []
//             }
//           }
//         });
//       })
//       .catch(error => {
//         console.log('DB Error: ', error);
//       });
//   }

//   getOrders() {
//     const db = getDB();

//     return db.collection('orders').find({ 'user._id': new ObjectId(this._id) }).toArray();
//   }

//   static findById(userId) {
//     const db = getDB();

//     return db.collection('users').findOne({
//       _id: new ObjectId(userId)
//     }).then(user => {
//       return user;
//     }).catch(error => {
//       console.log('Error while retrieving User from DB: ', error);
//     })
//   }
// }

// module.exports = User;