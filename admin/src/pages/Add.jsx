import { assets } from "../assets/admin_assets/assets";
import { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
    const [image1, setImage1] = useState(false);
    const [image2, setImage2] = useState(false);
    const [image3, setImage3] = useState(false);
    const [image4, setImage4]= useState(false);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('Men');
    const [subCategory, setSubCategory] = useState('Topwear');
    const [bestSeller, setBestSeller] = useState(false);
    const [sizes, setSizes] = useState([]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try{
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('category', category);
            formData.append('subCategory', subCategory);
            formData.append('bestSeller', bestSeller);
            formData.append('sizes', JSON.stringify(sizes));

            image1 && formData.append('image1', image1);
            image2 && formData.append('image2', image2);
            image3 && formData.append('image3', image3);
            image4 && formData.append('image4', image4);

            const response = await axios.post((backendUrl) + '/api/product/add', formData, {headers: {token}})
            if(response.data.success){
                toast.success(response.data.message)
                console.log(response.data)
            }
            else{
                toast.error(response.data.message)
            }
        }catch(err){
            console.log(err)
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className="flex flex-col items-start w-full gap-3">
            <div className="flex flex-col items-start w-full gap-3">
                <p className="mb-2">Upload Image</p>
                <div className="flex gap-2">
                    <label htmlFor="image1">
                        <img className="w-20" src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
                        <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
                    </label>
                    <label htmlFor="image2">
                        <img className="w-20" src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
                        <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
                    </label>
                    <label htmlFor="image3">
                        <img className="w-20" src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
                        <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
                    </label>
                    <label htmlFor="image4">
                        <img className="w-20" src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
                        <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
                    </label>
                </div>

                <div className="w-full">
                    <p className="mb-2">Product Name</p>
                    <input className="w-full max-w-[500px] px-3 py-2" onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Type here" required />
                </div>

                <div className="w-full">
                    <p className="mb-2">Product Description</p>
                    <textarea className="w-full max-w-[500px] px-3 py-2" onChange={(e) => setDescription(e.target.value)} value={description} type="text" placeholder="Write content here" required />
                </div>

                <div className="flex flex-col w-full gap-2 sm:flex-row sm:gap-8">
                    <div className="">
                        <p className="mb-2">Product Category</p>
                        <select className="w-full px-3 py-2" onChange={(e) => setCategory(e.target.value)} value={category}>
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                            <option value="Kids">Kids</option>
                        </select>
                    </div>
                    <div className="">
                        <p className="mb-2">Product SubCategory</p>
                        <select className="w-full px-3 py-2" onChange={(e) => setSubCategory(e.target.value)} value={subCategory}>
                            <option value="Topwear">Topwear</option>
                            <option value="Bottomwear">Bottomwear</option>
                            <option value="Winterwear">Winterwear</option>
                        </select>
                    </div>
                    <div className="">
                        <p className="mb-2">Product Price</p>
                        <input className="w-full px-3 py-2 sm:w-[110px]" onChange={(e) => setPrice(e.target.value)} value={price} type="number" placeholder="25" />
                    </div>
                </div>
                <div>
                    <p className="mb-2">Product Sizes</p>
                    <div className="flex gap-3">
                        <div onClick={() => setSizes(p => p.includes('S') ? p.filter(x => x !== 'S') : [...p, 'S'])}>
                            <p className={`px-3 py-1 cursor-pointer ${sizes.includes('S') ? 'bg-pink-100' : 'bg-slate-200'}`}>S</p>
                        </div>
                        <div onClick={() => setSizes(p => p.includes('M') ? p.filter(x => x !== 'M') : [...p, 'M'])}>
                            <p className={`px-3 py-1 cursor-pointer ${sizes.includes('M') ? 'bg-pink-100' : 'bg-slate-200'}`}>M</p>
                        </div>
                        <div onClick={() => setSizes(p => p.includes('L') ? p.filter(x => x !== 'L') : [...p, 'L'])}>
                            <p className={`px-3 py-1 cursor-pointer ${sizes.includes('L') ? 'bg-pink-100' : 'bg-slate-200'}`}>L</p>
                        </div>
                        <div onClick={() => setSizes(p => p.includes('XL') ? p.filter(x => x !== 'XL') : [...p, 'XL'])}>
                            <p className={`px-3 py-1 cursor-pointer ${sizes.includes('XL') ? 'bg-pink-100' : 'bg-slate-200'}`}>XL</p>
                        </div>
                        <div onClick={() => setSizes(p => p.includes('XXL') ? p.filter(x => x !== 'XXL') : [...p, 'XXL'])}>
                            <p className={`px-3 py-1 cursor-pointer ${sizes.includes('XXL') ? 'bg-pink-100' : 'bg-slate-200'}`}>XXL</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-2 mt-2">
                <input onChange={(e) => setBestSeller(p => !p)} checked={bestSeller} type="checkbox" id="bestSeller"/>
                <label className="cursor-pointer" htmlFor="bestSeller">Add to best seller</label>
            </div>
            <button type="submit" className="py-3 mt-4 text-white bg-black w-28">ADD</button>
        </form>
    )
}

export default Add