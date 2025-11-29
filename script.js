
document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("loginBtn");
    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;

            if (email === "admin@gmail.com" && password === "admin123") {
                alert("Login successful!");
                window.location.href = "admin.html";  // REDIRECT
            } else {
                alert("Wrong email or password");
            }
        });
    }
});



let fleetData = [];

document.addEventListener("DOMContentLoaded", () => {
    
    if (!document.getElementById("addFleetBtn")) return;

    const regNum = document.getElementById("regNum");
    const vehicleCategory = document.getElementById("vehicleCategory");
    const driverName = document.getElementById("driverName");
    const isAvailable = document.getElementById("isAvailable");
    const addBtn = document.getElementById("addFleetBtn");

    const mainContent = document.getElementById("mainContent");

    const filterCategory = document.getElementById("filterCategory");
    const filterAvailability = document.getElementById("filterAvailability");
    const clearFilter = document.getElementById("clearFilter");
    addBtn.addEventListener("click", () => {
        if (regNum.value.trim() === "" || driverName.value.trim() === "") {
            alert("All required fields must be filled!");
            return;
        }

        let fleetObj = {
            reg: regNum.value,
            category: vehicleCategory.value,
            driver: driverName.value,
            status: isAvailable.value,
            img: "https://coding-platform.s3.amazonaws.com/dev/lms/tickets/5e80fcb6-3f8e-480c-945b-30a5359eb40e/JNmYjkVr3WOjsrbu.png"
        };

        fleetData.push(fleetObj);

        renderCards(fleetData);

        // Clear form
        regNum.value = "";
        driverName.value = "";
    });



    function renderCards(data) {
        mainContent.innerHTML = ""; // Clear previous cards

        data.forEach((vehicle, index) => {
            let card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
                <img src="${vehicle.img}" />
                <h3>Reg: ${vehicle.reg}</h3>
                <p>Category: ${vehicle.category}</p>
                <p>Driver: ${vehicle.driver}</p>
                <p>Status: ${vehicle.status}</p>

                <button class="updateDriverBtn">Update Driver</button>
                <button class="changeAvailabilityBtn">Change Availability</button>
                <button class="deleteBtn">Delete Vehicle</button>
            `;
            card.querySelector(".updateDriverBtn").addEventListener("click", () => {
                let newName = prompt("Enter new driver name:");
                if (!newName || newName.trim() === "") {
                    alert("Driver name cannot be empty!");
                    return;
                }
                vehicle.driver = newName;
                renderCards(fleetData);
            });
            card.querySelector(".changeAvailabilityBtn").addEventListener("click", () => {
                vehicle.status = vehicle.status === "Available" ? "Unavailable" : "Available";
                renderCards(fleetData);
            });
            card.querySelector(".deleteBtn").addEventListener("click", () => {
                if (confirm("Are you sure you want to delete this vehicle?")) {
                    fleetData.splice(index, 1);
                    renderCards(fleetData);
                }
            });

            mainContent.appendChild(card);
        });
    }
    filterCategory.addEventListener("change", applyFilters);
    filterAvailability.addEventListener("change", applyFilters);

    function applyFilters() {
        let categoryValue = filterCategory.value;
        let availabilityValue = filterAvailability.value;

        let filteredData = fleetData.filter(vehicle =>
            (categoryValue === "All" || vehicle.category === categoryValue) &&
            (availabilityValue === "All" || vehicle.status === availabilityValue)
        );

        renderCards(filteredData);
    }
    clearFilter.addEventListener("click", () => {
        filterCategory.value = "All";
        filterAvailability.value = "All";
        renderCards(fleetData);
    });

});
