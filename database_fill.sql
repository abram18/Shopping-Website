-- After running the springboot, kindly insert the following queries:

INSERT INTO public.product (category, description, image, name, price)
VALUES ('Electronics', 'Smartphone', 'https://i.ebayimg.com/images/g/UyYAAOSwqeliMH6-/s-l1600.jpg', 'iPhone X', 999.99);

INSERT INTO public.product (category, description, image, name, price)
VALUES ('Electronics', 'Headphones', 'https://i.ebayimg.com/images/g/TD0AAOSwRodfwT1H/s-l1600.jpg', 'Beats Studio', 299.99);

INSERT INTO public.product (category, description, image, name, price)
VALUES ('Home', 'Cushion', 'https://cdn.shopify.com/s/files/1/0290/6177/5439/products/GadLeoCushionCover_39195799_800x.jpg?v=1647237497', 'Decorative Cushion', 19.99);

INSERT INTO public.product (category, description, image, name, price)
VALUES ('Fashion', 'T-Shirt', 'https://www.printciouscdn.com/Upload/BulkOrderSubCategory/1-t-shirts-photo1-20220913103322.jpg?v=2723', 'Basic T-Shirt', 9.99);

INSERT INTO public.product (category, description, image, name, price)
VALUES ('Beauty', 'Perfume', 'https://hips.hearstapps.com/hmg-prod/images/coco-mademoiselle-perfume-chanel-1675113242.png', 'Luxury Perfume', 149.99);

INSERT INTO public.roles (id, name)
VALUES
(1, ' ROLE_USER'),
(2, ' ROLE_MODERATOR'),
(3, ' ROLE_ADMIN');
