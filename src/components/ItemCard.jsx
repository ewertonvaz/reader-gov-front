import { Link } from "react-router-dom";
import imageDefault from '../assets/item-card-image-default.png';

function ItemCard({ item }) {

    return (

        <div className="item-card">
            <div className="item-card-image">
                <Link to={item.route}>
                    <img className="img-fluid" src={item.image || imageDefault} alt={item.title} />
                </Link>
            </div>
            <div className="item-card-title">
                {item.title.length <= 40 ? item.title : item.title.substr(0, 36) + ' ...'}
            </div>

        </div>
    );
}

export default ItemCard;
