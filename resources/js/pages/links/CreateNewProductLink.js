import React, {useState} from "react";
import {TitleBar, useRoutePropagation, ResourcePicker} from "@shopify/app-bridge-react";
import {useLocation} from "react-router-dom";
import axios from 'axios';

export default function CreateNewProductLink() {
    let location = useLocation();

    // console.log(location)
    useRoutePropagation(location)

    const [resourcePickerOpen, setResourcePickerOpen] = useState(true)
    const [productData, setProductData] = useState(false)

    function HandleResourcePicker(resource){
        axios.post('/app/graphql', {
            query: `
            {
                product(id: "${resource.selection[0].id}"){
                    onlineStoreUrl
                }
            }
            `
        })
        .then(function (response){
            let productInfo = {
                ...resource.selection[0],
                productUrl: response.data.product.onlineStoreUrl
            }
            // console.log('is running')
            // console.log(response)
            // console.log("new object productInfo")
            console.log(productInfo)
            setProductData(productInfo)

        })
        .catch(function(error){
            console.log(error)
        })
        .then(function(){

        })
    }

    return (
        <>
            <TitleBar title="Create New Link" />
            <ResourcePicker resourceType="Product" open={resourcePickerOpen} onSelection={HandleResourcePicker} />
            <div className={productData == false ? "app-page-title d-none" : "app-page-title"}>
                <div className="page-title-wrapper">
                    <div className="page-title-heading">
                        <div className="page-title-icon">
                            <i className="pe-7s-display1 icon-gradient bg-premium-dark"></i>
                        </div>
                        <div>
                            Create A New Link
                            <div className="page-title-subheading">
                                Choose a product and create a link to promote
                                it.
                            </div>
                        </div>
                    </div>
                    <div className="page-title-actions">
                        <div className="d-inline-block dropdown">
                            <button
                                type="button"
                                className="btn-shadow btn btn-info"
                            >
                                <span className="btn-icon-wrapper pr-2 opacity-7">
                                    <i className="fa fa-business-time fa-w-20"></i>
                                </span>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {productData == false ? "" : <Content productData={productData} />}
        </>
    );
}

function Content(props){
    return (<>
        <div className="row">
                <div className="col-md-6">
                    <div className="main-card mb-3 card">
                        <div className="card-body">
                            <h5 className="card-title">Controls Types</h5>
                            <form>
                                <div className="position-relative form-group">
                                    <label htmlFor="productUrl">
                                        Product URL
                                    </label>
                                    <input
                                        name="productUrl"
                                        id="productUrl"
                                        placeholder="Product URL"
                                        type="text"
                                        className="form-control"
                                        defaultValue={props.productData.productUrl}
                                    />
                                </div>
                                <div className="position-relative form-group">
                                    <label htmlFor="campaignSource" className="">
                                        Campaign Source
                                    </label>
                                    <input
                                        name="campaignSource"
                                        id="campaignSource"
                                        placeholder="Google, Youtube, Instagram"
                                        type="text"
                                        className="form-control"
                                    />
                                </div>
                                <div className="position-relative form-group">
                                    <label htmlFor="campaignMedium" className="">
                                        Campaign Medium
                                    </label>
                                    <input
                                        name="campaignMedium"
                                        id="campaignMedium"
                                        placeholder="CPC, Banner, Instagram Profile Link"
                                        type="text"
                                        className="form-control"
                                    />
                                </div>
                                <div className="position-relative form-group">
                                    <label htmlFor="campaignName" className="">
                                        Campaign Name
                                    </label>
                                    <input
                                        name="campaignName"
                                        id="campaignName"
                                        placeholder="50July42020, Labor Day 2020, COUPON234KID"
                                        type="text"
                                        className="form-control"
                                    />
                                </div>
                                <div className="position-relative form-group">
                                    <label htmlFor="campaignTerm" className="">
                                        Campaign Term (Optional)
                                    </label>
                                    <input
                                        name="campaignTerm"
                                        id="campaignTerm"
                                        placeholder="Add Paid Keywords"
                                        type="text"
                                        className="form-control"
                                    />
                                </div>
                                <div className="position-relative form-group">
                                    <label htmlFor="campaignContent" className="">
                                        Campaign Content
                                    </label>
                                    <input
                                        name="campaignContent"
                                        id="campaignContent"
                                        placeholder="Girl With Laptop Image Ad, Image3, Banner 5"
                                        type="text"
                                        className="form-control"
                                    />
                                </div>
                               
                                <button className="mt-1 btn btn-primary">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="main-card mb-3 card">
                        <div className="card-body">
                            <h5 className="card-title">Product</h5>
                            <div className="row mb-3">
                                <div className="col-md-4">
                                    <img src={props.productData.images[0].originalSrc} className="img-fluid"/>
                                </div>
                                <div className="col-md-8 d-flex align-items-center">
                                    <h2>
                                            {props.productData.title}
                                    </h2>
                                </div>
                            </div>
                          
                            <h5 className="card-title">Link Preview</h5>
                            <div className="position-relative form-group">
                                    <textarea
                                        name="linkPreview"
                                        id="linkPreview"
                                        disabled
                                        type="text"
                                        className="form-control"
                                    />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </>)
}
