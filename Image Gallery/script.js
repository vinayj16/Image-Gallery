const images = [
            { src: "https://th.bing.com/th/id/R.06a27cf1bf8af04da74dd66c416c962f?rik=C2MZ3t67caVXIA&riu=http%3a%2f%2fyesofcorsa.com%2fwp-content%2fuploads%2f2018%2f01%2fSunset-In-The-Mountains-Wallpaper.jpg&ehk=xo3g7F8fy1t2bqBpQGoH5DotTSa7QIGPgIzGrqLGy98%3d&risl=&pid=ImgRaw&r=0", alt: "Sunset over mountains", category: "nature", description: "A breathtaking view of the sun setting behind majestic mountains.", tags: ["sunset", "mountains", "landscape"], date: "2024-05-15" },
            { src: "https://i.pinimg.com/originals/ba/bd/b9/babdb9a770dd5ee06fea15d1ad2cde54.jpg", alt: "Modern skyscraper", category: "architecture", description: "An impressive modern skyscraper reaching towards the sky.", tags: ["urban", "building", "modern"], date: "2024-06-22" },
            { src: "https://thumbs.dreamstime.com/b/colorful-mixed-fruit-platter-mango-strawberry-blueberry-kiwi-green-grape-healthy-food-colorful-mixed-fruit-platter-99707071.jpg", alt: "Colorful sushi platter", category: "food", description: "A delightful assortment of fresh, colorful sushi.", tags: ["japanese", "seafood", "gourmet"], date: "2024-07-10" },
            { src: "https://wallpaperaccess.com/full/424849.jpg", alt: "Tropical beach", category: "nature", description: "A serene tropical beach with crystal clear water and white sand.", tags: ["beach", "ocean", "vacation"], date: "2024-08-05" },
            { src: "https://www.learnreligions.com/thmb/WEDA-baOyUwc2xAgVhOTlnPturo=/3865x2576/filters:fill(auto,1)/unesco-site-shore-temple-of-mahabalipuram-545365143-58e556835f9b58ef7e92faf3.jpg", alt: "Ancient temple", category: "architecture", description: "An awe-inspiring ancient temple with intricate details.", tags: ["history", "culture", "landmark"], date: "2024-09-18" },
            { src: "https://th.bing.com/th/id/OIP.HqKwFsYrxtiD18gATqO0pwAAAA?rs=1&pid=ImgDetMain", alt: "Gourmet burger", category: "food", description: "A mouthwatering gourmet burger with all the fixings.", tags: ["fastfood", "beef", "delicious"], date: "2024-10-03" },
            { src: "https://th.bing.com/th/id/R.9152b479fd640f33f2ccf86a783af43e?rik=dAu4KoKMp%2fVFzg&riu=http%3a%2f%2fwondrouspics.com%2fwp-content%2fuploads%2f2011%2f12%2fkitten-two.jpg&ehk=wRn6l2tAzVqg9Z3BjRh8Ub4DgyZaz81uio9gP5%2fgnDw%3d&risl=&pid=ImgRaw&r=0", alt: "Cute kitten", category: "animals", description: "An adorable kitten with big, curious eyes.", tags: ["cat", "pet", "cute"], date: "2024-05-30" },
            { src: "https://i.pinimg.com/originals/85/03/0c/85030cc59e7fa079ac2bdecf0279be8b.jpg", alt: "Majestic lion", category: "animals", description: "A powerful and majestic lion in its natural habitat.", tags: ["wildlife", "predator", "safari"], date: "2024-06-14" },
            { src: "https://th.bing.com/th/id/R.0b23e71ae7b71d5ebe7fb9c82d7735d8?rik=Q1e8MpVeum5XDw&riu=http%3a%2f%2fwww.archanaskitchen.com%2fimages%2farchanaskitchen%2fworld_breakfast%2ffresh_fruit_bowl_recipe.jpg&ehk=yZEG5vBScZS6uTZwoc9gW4vxm9ncvHJjPgCY6iSDo%2fk%3d&risl=&pid=ImgRaw&r=0", alt: "Fresh fruit bowl", category: "food", description: "A vibrant bowl of fresh, juicy fruits.", tags: ["healthy", "colorful", "dessert"], date: "2024-07-28" }
        ];

        let currentCategory = 'all';
        let currentSearch = '';
        let currentImageIndex = 0;

        function updateGallery() {
            const filteredImages = images.filter(image => 
                (currentCategory === 'all' || image.category === currentCategory) &&
                (image.alt.toLowerCase().includes(currentSearch) || 
                 image.description.toLowerCase().includes(currentSearch) ||
                 image.tags.some(tag => tag.toLowerCase().includes(currentSearch)))
            );

            const sortValue = document.getElementById('sort').value;
            if (sortValue === 'name') {
                filteredImages.sort((a, b) => a.alt.localeCompare(b.alt));
            } else if (sortValue === 'category') {
                filteredImages.sort((a, b) => a.category.localeCompare(b.category));
            } else if (sortValue === 'date') {
                filteredImages.sort((a, b) => new Date(b.date) - new Date(a.date));
            }

            displayImages(filteredImages);
        }

        function displayImages(imagesToShow) {
            const gallery = document.getElementById('gallery');
            gallery.innerHTML = imagesToShow.map((image, index) => `
                <div class="image-container" onclick="openLightbox(${index})">
                    <img src="${image.src}" alt="${image.alt}" loading="lazy">
                    <div class="image-info">
                        <h3>${image.alt}</h3>
                        <p>${image.description}</p>
                        <div class="tags">
                            ${image.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `).join('');
        }

        function openLightbox(index) {
            currentImageIndex = index;
            const lightbox = document.getElementById('lightbox');
            lightbox.style.display = 'block';
            updateLightboxContent();
        }

        function updateLightboxContent() {
            const image = images[currentImageIndex];
            const lightboxImg = document.getElementById('lightbox-img');
            const lightboxCaption = document.getElementById('lightbox-caption');

            lightboxImg.src = image.src;
            lightboxImg.alt = image.alt;
            lightboxCaption.innerHTML = `
                <h3>${image.alt}</h3>
                <p>${image.description}</p>
                <div class="tags">
                    ${image.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            `;
        }

        function closeLightbox() {
            document.getElementById('lightbox').style.display = 'none';
        }

        function navigateImage(direction) {
            currentImageIndex = (currentImageIndex + direction + images.length) % images.length;
            updateLightboxContent();
        }

        function filterImages(category) {
            currentCategory = category;
            updateGallery();
        }

        document.getElementById('search').addEventListener('input', (event) => {
            currentSearch = event.target.value.toLowerCase();
            updateGallery();
        });

        document.addEventListener('DOMContentLoaded', updateGallery);