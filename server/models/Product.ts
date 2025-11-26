
import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  category: 'Apparel' | 'Electronics' | 'Accessories' | 'Home';
  shape: 'box' | 'sphere' | 'torus';
  color: string;
  sizes: string[];
  inStock: boolean;
  createdAt: Date;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['Apparel', 'Electronics', 'Accessories', 'Home'] 
  },
  shape: { 
    type: String, 
    required: true, 
    enum: ['box', 'sphere', 'torus'],
    default: 'box'
  },
  color: { type: String, required: true, default: '#ffffff' },
  sizes: [{ type: String }],
  inStock: { type: Boolean, default: true },
}, {
  timestamps: true
});

export default mongoose.model<IProduct>('Product', ProductSchema);
