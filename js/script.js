const ACCESS_KEY = 'enDIIBJ1HhG8H-mMRnAYtyx6GmuRJJhLKTHJdDIHzs0';

        const searchInput = document.getElementById('search-input');
        const searchButton = document.getElementById('search-button');
        const imageGrid = document.getElementById('image-grid');
        const loading = document.getElementById('loading');
        const modal = document.getElementById('modal');
        const modalImage = document.getElementById('modal-image');
        const modalDescription = document.getElementById('modal-description');
        const downloadButton = document.getElementById('download-button');
        const closeButton = document.querySelector('.close-button');

        
    

        async function searchImages(query) {
            loading.style.display = 'block';
            imageGrid.innerHTML = '';

            try {
                const response = await fetch(
                    `https://api.unsplash.com/search/photos?query=${query}&per_page=30`,
                    {
                        headers: {
                            'Authorization': `Client-ID ${ACCESS_KEY}`
                        }
                    }
                );

                const data = await response.json();

                if (data.results.length === 0) {
                    imageGrid.innerHTML = '<p style="text-align: center; grid-column: 1 / -1;">No images found</p>';
                    return;
                }

                data.results.forEach(image => {
                    const imageItem = document.createElement('div');
                    imageItem.className = 'image-item';

                    const img = document.createElement('img');
                    img.src = image.urls.small;
                    img.alt = image.alt_description || 'Unsplash Image';
                    img.loading = 'lazy';

                    img.addEventListener('click', () => {
                        openModal(image.urls.regular, image.alt_description || 'No description available');
                    });

                    const imageInfo = document.createElement('div');
                    imageInfo.className = 'image-info';
                    imageInfo.innerHTML = `
                        <p>Photo by ${image.user.name}</p>
                        <a href="${image.links.download}" target="_blank" rel="noopener noreferrer">Download</a>
                    `;

                    imageItem.appendChild(img);
                    imageItem.appendChild(imageInfo);
                    imageGrid.appendChild(imageItem);
                });
            } catch (error) {
                console.error('Error fetching images:', error);
                imageGrid.innerHTML = '<p style="text-align: center; grid-column: 1 / -1;">Error loading images</p>';
            } finally {
                loading.style.display = 'none';
            }
        }

        function openModal(imageUrl, description) {
            modal.style.display = 'flex';
            modalImage.src = imageUrl;
            modalDescription.textContent = description;
        }

        function closeModal() {
            modal.style.display = 'none';
            modalImage.src = '';
            modalDescription.textContent = '';
        }

        searchButton.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if (query) {
                searchImages(query);
            }
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) {
                    searchImages(query);
                }
            }
        });

        closeButton.addEventListener('click', closeModal);
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Example to open the modal and update the download link
function openModal(imageSrc, description) {
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
    const downloadButton = document.getElementById('download-button');

    // Update the modal content
    modalImage.src = imageSrc;
    modalDescription.textContent = description;
    downloadButton.href = imageSrc; // Set the href to the image source for downloading

    // Show the modal
    modal.style.display = 'flex';
}

// Close the modal
document.querySelector('.close-button').addEventListener('click', function () {
    document.getElementById('modal').style.display = 'none';
});
