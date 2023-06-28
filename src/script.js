let keranjang = [];
let totalHarga = 0;


function tambahMakanan(namaMakanan, hargaMakanan){
    let makananIndex = keranjang.findIndex((makanan) => makanan.nama === namaMakanan);
    if (makananIndex !== -1) {
        keranjang[makananIndex].kuantitas +=1;
        keranjang[makananIndex].total = keranjang[makananIndex].harga * keranjang[makananIndex].kuantitas;
    } else {
        keranjang.push({
   
            nama : namaMakanan,
            harga : hargaMakanan,
            kuantitas :  1,
            total : hargaMakanan,
        });
        
    }
    totalHarga += hargaMakanan;

    updateKeranjang();
}


function hapusMakanan(index){
   const harga = keranjang[index].total;
   totalHarga -= harga;
   keranjang.splice(index,1);
   updateKeranjang();
}

function tambahKuantitas(index) {
    keranjang[index].kuantitas += 1;
    keranjang[index].total = keranjang[index].harga * keranjang[index].kuantitas;
    totalHarga += keranjang[index].harga;
    updateKeranjang();
}

function kurangiKuantitas(index) {
    keranjang[index].kuantitas -= 1;
    keranjang[index].total = keranjang[index].harga * keranjang[index].kuantitas;
    totalHarga -= keranjang[index].harga;
    if (keranjang[index].kuantitas === 0) {
        keranjang.splice(index,1);
    }
    updateKeranjang();
}

function updateKeranjang(){
   const makananList = document.getElementById("makanan-list");
   const totalHargaElement = document.getElementById("total-harga")

    makananList.innerHTML = "";
    keranjang.forEach((makanan,index) => {
        const tr = document.createElement("tr");
         
          const namaTd = document.createElement("td");
          const kuantitasTd = document.createElement("td");
          const totalTd = document.createElement("td");
          const aksiTd = document.createElement("td");
          const tambahButton = document.createElement("button");
          const kurangButton = document.createElement("button");

          
          namaTd.innerHTML = makanan.nama;
         
          kuantitasTd.innerHTML = makanan.kuantitas;
          totalTd.innerHTML = formatRupiah(makanan.total);


            // tambah button
          tambahButton.innerHTML = '+';
          tambahButton.classList.add('btn', 'btn-sm', 'btn-primary', 'w-auto', 'text-center', 'me-1');
          tambahButton.onclick = () => tambahKuantitas(index);

        //   kurang button
        kurangButton.innerHTML = '-';
        kurangButton.classList.add('btn', 'btn-sm', 'btn-danger', 'w-auto', 'text-center');
        kurangButton.onclick = () => kurangiKuantitas(index);

        // aksi td
        aksiTd.appendChild(tambahButton);
        aksiTd.appendChild(kurangButton);

        // tr 
    
        tr.appendChild(namaTd);
        tr.appendChild(totalTd);
        tr.appendChild(kuantitasTd);
      
        tr.appendChild(aksiTd);

        makananList.appendChild(tr);

    });
        totalHargaElement.innerHTML = formatRupiah(totalHarga);
}



function submitForm(event) {
   event.preventDefault();

//   make variable
   const nama = document.getElementById('nama').value;
    const nomorMeja = document.getElementById('nomor-meja').value;

    // lakukan sesuatu dengan data checkout

    alert(`pesanan atas nama ${nama} nomor meja ${nomorMeja} berhasil dikirim.`);
    alert(`Terimakasih atas pemesanannya ${nama}.`);

    console.log(`Nama : ${nama}`);
    console.log(`Nomor Meja : ${nomorMeja}`);
    console.log(`Keranjang : ${keranjang}`);

    // reset form dan keranjang setelah submit
    document.getElementById('checkout-form').reset();
    keranjang = [];
    totalHarga = 0;

    updateKeranjang();

}

// format rupiah
function formatRupiah(angka) {
    return angka.toLocaleString('id-ID',
    { style: 'currency', currency: 'IDR'});
}