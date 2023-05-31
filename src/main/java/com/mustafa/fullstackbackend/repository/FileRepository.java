package com.mustafa.fullstackbackend.repository;

import com.mustafa.fullstackbackend.model.Directory;
import com.mustafa.fullstackbackend.model.FileModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FileRepository extends JpaRepository<FileModel, Long> {
    @Query("SELECT f FROM FileModel f " +
            "JOIN Directory d ON f.directoryId = d.directoryId WHERE d.directoryId = :directoryId")
    List<FileModel> getFilesFromDirectory(@Param("directoryId") Long directoryId);


    @Query("SELECT f from FileModel f join Sharing s on f.fileId=s.fileId where s.userId=:userId")
    List<FileModel> getSharedFilesOfUser(Long userId);

    List<FileModel> getFileModelsByOwnerUserId(Long userId);
}
