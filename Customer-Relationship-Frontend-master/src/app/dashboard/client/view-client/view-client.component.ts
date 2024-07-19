import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx'; 
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StorageService } from 'src/app/_services/storage.service';
import { UserService } from 'src/app/_services/user.service';
import Swal from 'sweetalert2';
import * as FileSaver from 'file-saver';
import { AuthService } from 'src/app/_services/auth.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.css']
})
export class ViewClientComponent {

  form: any = {
    firstname: null,
    lastname: null,
    phone: null,
    address: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isUpdateFailed = false;
  errorMessage = '';

  allUsers: any;
  isLoggedIn: any;
  username: any;
  content: any;
  errormessage = ''
  roles: any;
  showAdminBoard: any;
  showModeratorBoard: any;
  userData: any = [];
  userId!: number;
  commandsData: any;
  user_id!: number;
  printing = false;
  showPagination = true;
  generatingPdf = false;

  @ViewChild('reportContent', { static: false }) reportContent!: ElementRef;

  data: any;
  displayedColumns: string[] = ['ID','title', 'description',  'dateCommand', 'status', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  id: any;
  snapshot: any;
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private authService: AuthService

  ) { }



  ngOnInit(): void {
    this.getEmployeeById()
  }

  getEmployeeById() {
    this.userId = this.activatedRoute.snapshot.params['id'];
    this.userService.getAdminBoard(this.userId).subscribe(
      (data: any) => {
        this.userData = this.form = data;
        this.commandsData = data.commands;
        this.getCommandsByid()
        console.log(this.commandsData);

      }
    ),
      (err: Error) => {
        this.errormessage = err.message;
        console.log("error");

      }
  }
  getCommandsByid() {
    
        const datas=this.commandsData
        // if(this.allUsers.commands){
        this.dataSource = new MatTableDataSource(datas);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.allUsers);
      
  }

  GetCommandProductList(commandId: number) {
    // Find the command by ID
    const command = this.commandsData;
  
    if (command) {
      const selectedCommand = command?.find((cmd: any) => cmd.id === commandId);
      if (selectedCommand) {
        const products = selectedCommand.products;
  
        // Prepare HTML content for SweetAlert2
        const productsHtml = products.map(
          (product:any) => `<p>${product.name} - Quantity: ${product.quantity} - Price: ${product.price}</p>`
        ).join('');
  
        Swal.fire({
          title: 'List of products',
          icon: 'success',
          html: productsHtml,
          timerProgressBar: true,
        });
      } else {
        // Handle the case where the command is not found
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'Command not found 1',
        });
      }
    } else {
      // Handle the case where the command is not found
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: 'Command not found 2',
      });
    }
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  generateExcel(): void {
    this.userService.usersByEmailDepartment(this.user_id).subscribe((data: any) => {
      this.userData = data;
      const filteredData = this.userData.map((item: any) => {
        const { password, ...filteredItem } = item;
        return filteredItem;
      });

      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredData);
      console.log(this.userData);

      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      const arrayBuffer = XLSX.write(wb, {
        bookType: 'xlsx',
        type: 'array',
      });

      const blob = new Blob([arrayBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'api_data.xlsx');
    });
  }

  print() {
    // Disable actions button and pagination while printing
    this.printing = true;
    this.showPagination = false;


    // ... Rest of your print() logic ...

    // Re-enable actions button and pagination after printing
    this.printing = false;
    this.showPagination = true;
    // Create a copy of the table content without "Actions" buttons and .no-print elements
    const tableContent = this.reportContent.nativeElement.cloneNode(true);

    // Define the removeActionsButtons function
    const removeActionsButtons = (element: HTMLElement) => {
      // Remove the "Actions" section
      const actionsHeader = element.querySelector('.mat-column-actions') as HTMLElement | null;
      if (actionsHeader) {
        actionsHeader.parentElement?.removeChild(actionsHeader);
      }

      // Remove the actions buttons
      const actionsButtons = element.querySelectorAll('.mat-column-actions button') as NodeListOf<HTMLElement>;
      actionsButtons.forEach((button: HTMLElement) => {
        button.parentElement?.removeChild(button);
      });
    };

    // Remove elements with the class "no-print"
    const noPrintElements = tableContent.querySelectorAll('.no-print') as NodeListOf<HTMLElement>;
    noPrintElements.forEach((element: HTMLElement) => {
      element.parentElement?.removeChild(element);
    });

    // Call the removeActionsButtons function to remove action buttons
    removeActionsButtons(tableContent);

    // Open a new window for printing
    const printWindow = window.open('', '', 'width=600,height=600');

    if (!printWindow) {
      alert('Popup blocker may be preventing the print window from opening. Please allow popups and try again.');
      // Re-enable actions button and pagination in case of popup blocker or other issues
      this.printing = false;
      return;
    }

    // Write the table content to the new window
    printWindow.document.open();
    printWindow.document.write('<html><head><title>Print</title></head><body><h2>List of employees in NetView Solutions</h2>');
    printWindow.document.write(tableContent.outerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();

    // Trigger the print dialog
    printWindow.print();

    // Re-enable actions button and pagination after printing
    this.printing = false;
  }
  removedColumn: any = '';

  generateReport(): void {

    this.printing = true;
    this.showPagination = false;


    // ... Rest of your print() logic ...

    // Re-enable actions button and pagination after printing
    this.printing = false;
    this.showPagination = true;

    const doc = new jspdf.jsPDF();
    const tableContent = this.reportContent.nativeElement;


    const removeActionsButtons = (element: HTMLElement) => {
      // Remove the "Actions" section
      const actionsHeader = element.querySelector('.mat-column-actions') as HTMLElement | null;
      if (actionsHeader) {
        actionsHeader.parentElement?.removeChild(actionsHeader);
      }

      // Remove the actions buttons
      const actionsButtons = element.querySelectorAll('.mat-column-actions button') as NodeListOf<HTMLElement>;
      actionsButtons.forEach((button: HTMLElement) => {
        button.parentElement?.removeChild(button);
      });
    };

    // Remove elements with the class "no-print"
    const noPrintElements = tableContent.querySelectorAll('.no-print') as NodeListOf<HTMLElement>;
    noPrintElements.forEach((element: HTMLElement) => {
      element.parentElement?.removeChild(element);
    });

    // Call the removeActionsButtons function to remove action buttons
    removeActionsButtons(tableContent);




    const fontSize = 30; // You can adjust this value as needed
    doc.setFontSize(fontSize); // Set the font size
    const scaleFactor = doc.internal.pageSize.width / tableContent.offsetWidth;
    // Increase the scale factor for higher image quality
    const scale = 3; // You can adjust this value as needed
    // Load the watermark image
    const watermarkImage = new Image();
    watermarkImage.src = 'assets/netviewadministrationlogo.png'; // Replace with the actual path to your watermark image
    html2canvas(tableContent, { scale }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = (canvas.height * imgWidth) / canvas.width;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const paddingLeft = 1;
      const paddingTop = 20;
      const docDefinition = {
        content: [
          {
            image: 'src/assets/netviewadministrationlogo.png',
            width: doc.internal.pageSize.getWidth(),
            height: doc.internal.pageSize.getHeight(),
          },
          { image: imgData, width: imgWidth, height: imgHeight, margin: [paddingLeft, paddingTop, 0, 0] },
        ],
      };
      doc.addImage(imgData, 'PNG', paddingLeft, paddingTop, imgWidth, imgHeight);
      doc.save('rapport.pdf');
    });


    this.printing = false;
    setTimeout(() => {
      this.reloadPage()
    }, 5000);
  }
  reloadPage(): void {
    window.location.reload();
  }
}