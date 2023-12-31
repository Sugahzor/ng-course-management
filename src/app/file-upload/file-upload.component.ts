import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { finalize, Subscription } from 'rxjs';

// https://blog.angular-university.io/angular-file-upload/

@Component({
  selector: 'file-upload',
  templateUrl: 'file-upload.component.html',
  styleUrls: ['file-upload.component.scss'],
})
export class FileUploadComponent {
  @Input()
  requiredFileType: string;
  @Output() selectFile = new EventEmitter();

  fileName = '';
  uploadProgress: number | null;
  uploadSub: Subscription | null;

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      this.selectFile.emit(file);

      // const upload$ = this.http
      //   .post('/api/thumbnail-upload', formData, {
      //     reportProgress: true,
      //     observe: 'events',
      //   })
      //   .pipe(finalize(() => this.reset()));

      // this.uploadSub = upload$.subscribe((event) => {
      //   if (event.type == HttpEventType.UploadProgress) {
      //     event.total = event.total ? event.total : 1;
      //     this.uploadProgress = Math.round(100 * (event?.loaded / event.total));
      //   }
      // });
    }
  }

  cancelUpload() {
    this.uploadSub?.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
  }
}
